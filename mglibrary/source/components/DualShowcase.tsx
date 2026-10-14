import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type ShowcaseRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type DualShowcaseItem = {
  content: ReactNode;
  revealFrame: number;
  label?: string;
  rect?: Partial<ShowcaseRect>;
  background?: string;
  contentStyle?: CSSProperties;
};

export type DualShowcaseProps = {
  presenter: ReactNode;
  left: DualShowcaseItem;
  right: DualShowcaseItem;
  caption?: ReactNode;
  captionRevealFrame?: number;
  backdropDim?: number;
  cardBorder?: string;
  cardShadow?: string;
  fontFamily?: string;
  entranceFrames?: number;
  exitFrames?: number;
};

const reveal = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const mergeRect = (
  base: ShowcaseRect,
  override?: Partial<ShowcaseRect>,
): ShowcaseRect => ({...base, ...override});

export const DualShowcase = ({
  presenter,
  left,
  right,
  caption,
  captionRevealFrame,
  backdropDim = 0.18,
  cardBorder = '2px solid rgba(255,255,255,0.72)',
  cardShadow = '0 34px 90px rgba(0,0,0,0.38)',
  fontFamily = '"Arial Nova", Arial, Helvetica, sans-serif',
  entranceFrames = 22,
  exitFrames = 16,
}: DualShowcaseProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const cardWidth = width * 0.275;
  const cardHeight = height * 0.82;
  const cardY = height * 0.09;
  const sideInset = width * 0.055;
  const radius = width * 0.024;
  const leftRect = mergeRect(
    {
      x: sideInset,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      borderRadius: radius,
    },
    left.rect,
  );
  const rightRect = mergeRect(
    {
      x: width - sideInset - cardWidth,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      borderRadius: radius,
    },
    right.rect,
  );
  const exit =
    exitFrames > 0
      ? interpolate(
          frame,
          [durationInFrames - exitFrames, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.in(Easing.cubic),
          },
        )
      : 1;

  const renderCard = (
    item: DualShowcaseItem,
    rect: ShowcaseRect,
    side: 'left' | 'right',
  ) => {
    const progress = reveal(frame, item.revealFrame, entranceFrames);
    const offset = (1 - progress) * (side === 'left' ? -74 : 74);

    return (
      <div
        style={{
          position: 'absolute',
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height,
          overflow: 'hidden',
          borderRadius: rect.borderRadius,
          background: item.background ?? '#FFFFFF',
          border: cardBorder,
          boxShadow: cardShadow,
          opacity: progress,
          transform: `translateX(${offset}px) scale(${0.965 + progress * 0.035})`,
          willChange: 'transform, opacity',
        }}
      >
        <AbsoluteFill style={item.contentStyle}>{item.content}</AbsoluteFill>
        {item.label ? (
          <div
            style={{
              position: 'absolute',
              left: 22,
              top: 22,
              padding: '10px 15px',
              borderRadius: 12,
              background: 'rgba(0,68,114,0.9)',
              color: '#FFFFFF',
              fontSize: Math.max(18, width * 0.011),
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            {item.label}
          </div>
        ) : null}
      </div>
    );
  };

  const captionProgress = caption
    ? reveal(
        frame,
        captionRevealFrame ?? Math.min(left.revealFrame, right.revealFrame),
        16,
      )
    : 0;

  return (
    <AbsoluteFill
      style={{overflow: 'hidden', fontFamily, opacity: exit, color: '#FFFFFF'}}
    >
      <AbsoluteFill>{presenter}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background: [
            `rgba(0,0,0,${backdropDim})`,
            'linear-gradient(90deg, rgba(0,20,36,0.24), transparent 34%, transparent 66%, rgba(0,20,36,0.24))',
            'linear-gradient(0deg, rgba(0,0,0,0.25), transparent 34%)',
          ].join(','),
          pointerEvents: 'none',
        }}
      />
      {renderCard(left, leftRect, 'left')}
      {renderCard(right, rightRect, 'right')}
      {caption ? (
        <div
          style={{
            position: 'absolute',
            left: width * 0.33,
            right: width * 0.33,
            bottom: height * 0.035,
            display: 'flex',
            justifyContent: 'center',
            opacity: captionProgress,
            transform: `translateY(${(1 - captionProgress) * 18}px)`,
            textAlign: 'center',
          }}
        >
          {caption}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
