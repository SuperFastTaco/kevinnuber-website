import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type MinimalGradientScheme = 'light' | 'dark';
export type MinimalGradientBarMode = 'fullBleed' | 'card' | 'demo';

export type MinimalGradientBlob = {
  color: string;
  darkColor: string;
  centerX: number;
  centerY: number;
  radius: number;
  opacity: number;
  driftX: number;
  driftY: number;
};

export type MinimalGradientBackgroundProps = {
  scheme?: MinimalGradientScheme;
  barMode?: MinimalGradientBarMode;
  animationIn?: boolean;
  animationOut?: boolean;
  drift?: boolean;
  stageColor?: string;
  baseColor?: string;
  stageDarkColor?: string;
  baseDarkColor?: string;
  blobs?: [MinimalGradientBlob, MinimalGradientBlob];
  children?: ReactNode;
};

export const minimalGradientPalettes: Record<
  'simplicity' | 'reference',
  [MinimalGradientBlob, MinimalGradientBlob]
> = {
  simplicity: [
    {
      color: '#66A4D9',
      darkColor: '#0076BD',
      centerX: 0.28,
      centerY: 0.32,
      radius: 950,
      opacity: 0.68,
      driftX: 70,
      driftY: 42,
    },
    {
      color: '#0076BD',
      darkColor: '#004472',
      centerX: 0.74,
      centerY: 0.66,
      radius: 1100,
      opacity: 0.54,
      driftX: -84,
      driftY: -36,
    },
  ],
  reference: [
    {
      color: '#ff7ac8',
      darkColor: '#7d5cff',
      centerX: 0.28,
      centerY: 0.32,
      radius: 950,
      opacity: 0.85,
      driftX: 70,
      driftY: 42,
    },
    {
      color: '#45d6c8',
      darkColor: '#2d1b69',
      centerX: 0.74,
      centerY: 0.66,
      radius: 1100,
      opacity: 0.8,
      driftX: -84,
      driftY: -36,
    },
  ],
};

const clampInterpolate = (
  value: number,
  input: [number, number],
  output: [number, number],
  easing = Easing.linear,
) =>
  interpolate(value, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

const yoyoProgress = (
  seconds: number,
  startSeconds: number,
  legSeconds: number,
  legs: number,
) => {
  if (seconds <= startSeconds || seconds >= startSeconds + legSeconds * legs) {
    return 0;
  }

  const elapsed = seconds - startSeconds;
  const leg = Math.min(legs - 1, Math.floor(elapsed / legSeconds));
  const local = (elapsed - leg * legSeconds) / legSeconds;
  const eased = Easing.inOut(Easing.sin)(local);
  return leg % 2 === 0 ? eased : 1 - eased;
};

export const MinimalGradientBackground = ({
  scheme = 'light',
  barMode = 'demo',
  animationIn = true,
  animationOut = true,
  drift = true,
  stageColor = '#f5f5f7',
  baseColor = '#ffffff',
  stageDarkColor = '#000000',
  baseDarkColor = '#0a0a0c',
  blobs = minimalGradientPalettes.simplicity,
  children,
}: MinimalGradientBackgroundProps) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;
  const durationSeconds = durationInFrames / fps;
  const isDark = scheme === 'dark';

  const entranceOpacity = animationIn
    ? clampInterpolate(
        seconds,
        [0, 0.7],
        [0, 1],
        Easing.out(Easing.quad),
      )
    : 1;
  const exitOpacity = animationOut
    ? clampInterpolate(
        seconds,
        [Math.max(0, durationSeconds - 0.45), Math.max(0, durationSeconds - 0.05)],
        [1, 0],
        Easing.in(Easing.quad),
      )
    : 1;
  const rootOpacity = Math.min(entranceOpacity, exitOpacity);
  const entranceScale = animationIn
    ? clampInterpolate(
        seconds,
        [0, 1.2],
        [1.14, 1],
        Easing.out(Easing.cubic),
      )
    : 1;
  const ambient = drift ? yoyoProgress(seconds, 0.3, 2.35, 4) : 0;

  const settleIntoCard = clampInterpolate(
    seconds,
    [3.8, 4.9],
    [0, 1],
    Easing.inOut(Easing.cubic),
  );
  const returnToFullBleed = clampInterpolate(
    seconds,
    [7.6, 8.6],
    [0, 1],
    Easing.inOut(Easing.cubic),
  );
  const cardAmount =
    barMode === 'card'
      ? 1
      : barMode === 'fullBleed'
        ? 0
        : Math.min(settleIntoCard, 1 - returnToFullBleed);
  const cardX = width * 0.125 * cardAmount;
  const cardY = height * (140 / 1080) * cardAmount;
  const cardWidth = width * (1 - 0.25 * cardAmount);
  const cardHeight = height * (1 - (280 / 1080) * cardAmount);
  const cardRadius = width * (40 / 1920) * cardAmount;

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: isDark ? stageDarkColor : stageColor,
        opacity: rootOpacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: cardX,
          top: cardY,
          width: cardWidth,
          height: cardHeight,
          overflow: 'hidden',
          borderRadius: cardRadius,
          background: isDark ? baseDarkColor : baseColor,
          boxShadow:
            cardAmount > 0
              ? `0 ${30 * cardAmount}px ${80 * cardAmount}px rgba(0,0,0,${0.18 * cardAmount})`
              : 'none',
          willChange: 'left, top, width, height, border-radius',
        }}
      >
        {blobs.map((blob, index) => {
          const diameter = blob.radius * 2;
          const color = isDark ? blob.darkColor : blob.color;
          const transparent = isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)';

          return (
            <div
              key={`${color}-${index}`}
              style={{
                position: 'absolute',
                left: blob.centerX * width - blob.radius,
                top: blob.centerY * height - blob.radius,
                width: diameter,
                height: diameter,
                borderRadius: '50%',
                opacity: blob.opacity,
                background: `radial-gradient(circle closest-side, ${color} 0%, ${transparent} 72%)`,
                transform: `translate(${blob.driftX * ambient}px, ${blob.driftY * ambient}px) scale(${entranceScale})`,
                willChange: 'transform',
              }}
            />
          );
        })}
        {children}
      </div>
    </AbsoluteFill>
  );
};
