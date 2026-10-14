import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type PrimaryMediaRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type PresenterPipPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export type PrimaryMediaShowcaseProps = {
  media: ReactNode;
  presenter?: ReactNode;
  mediaRevealFrame: number;
  presenterRevealFrame?: number;
  mediaRect?: Partial<PrimaryMediaRect>;
  presenterRect?: Partial<PrimaryMediaRect>;
  presenterPosition?: PresenterPipPosition;
  presenterShape?: 'circle' | 'rounded';
  background?: string;
  mediaBackground?: string;
  mediaBorder?: string;
  mediaShadow?: string;
  mediaContentStyle?: CSSProperties;
  presenterContentStyle?: CSSProperties;
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
  base: PrimaryMediaRect,
  override?: Partial<PrimaryMediaRect>,
): PrimaryMediaRect => ({...base, ...override});

export const PrimaryMediaShowcase = ({
  media,
  presenter,
  mediaRevealFrame,
  presenterRevealFrame,
  mediaRect,
  presenterRect,
  presenterPosition = 'bottom-right',
  presenterShape = 'circle',
  background = '#E6E7E8',
  mediaBackground = '#FFFFFF',
  mediaBorder = '1px solid rgba(0,68,114,0.16)',
  mediaShadow = '0 34px 88px rgba(0,68,114,0.16)',
  mediaContentStyle,
  presenterContentStyle,
  entranceFrames = 24,
  exitFrames = 16,
}: PrimaryMediaShowcaseProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const hasPresenter = Boolean(presenter);
  const frameInsetX = hasPresenter ? width * 0.085 : width * 0.05;
  const frameInsetY = hasPresenter ? height * 0.08 : height * 0.055;
  const resolvedMediaRect = mergeRect(
    {
      x: frameInsetX,
      y: frameInsetY,
      width: width - frameInsetX * 2,
      height: height - frameInsetY * 2,
      borderRadius: width * 0.012,
    },
    mediaRect,
  );
  const pipSize = Math.min(width, height) * 0.31;
  const pipInsetX = width * 0.045;
  const pipInsetY = height * 0.035;
  const pipX = presenterPosition.endsWith('right')
    ? width - pipInsetX - pipSize
    : pipInsetX;
  const pipY = presenterPosition.startsWith('bottom')
    ? height - pipInsetY - pipSize
    : pipInsetY;
  const resolvedPresenterRect = mergeRect(
    {
      x: pipX,
      y: pipY,
      width: pipSize,
      height: pipSize,
      borderRadius: presenterShape === 'circle' ? pipSize / 2 : width * 0.024,
    },
    presenterRect,
  );
  const mediaProgress = reveal(frame, mediaRevealFrame, entranceFrames);
  const pipProgress = presenter
    ? reveal(
        frame,
        presenterRevealFrame ?? mediaRevealFrame + Math.round(entranceFrames * 0.45),
        18,
      )
    : 0;
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

  return (
    <AbsoluteFill style={{overflow: 'hidden', background, opacity: exit}}>
      <div
        style={{
          position: 'absolute',
          left: resolvedMediaRect.x,
          top: resolvedMediaRect.y,
          width: resolvedMediaRect.width,
          height: resolvedMediaRect.height,
          overflow: 'hidden',
          borderRadius: resolvedMediaRect.borderRadius,
          background: mediaBackground,
          border: mediaBorder,
          boxShadow: mediaShadow,
          opacity: mediaProgress,
          transform: `translateY(${(1 - mediaProgress) * 28}px) scale(${0.975 + mediaProgress * 0.025})`,
          willChange: 'transform, opacity',
        }}
      >
        <AbsoluteFill style={mediaContentStyle}>{media}</AbsoluteFill>
      </div>

      {presenter ? (
        <div
          style={{
            position: 'absolute',
            left: resolvedPresenterRect.x,
            top: resolvedPresenterRect.y,
            width: resolvedPresenterRect.width,
            height: resolvedPresenterRect.height,
            overflow: 'hidden',
            borderRadius: resolvedPresenterRect.borderRadius,
            background: '#111111',
            border: '3px solid rgba(255,255,255,0.92)',
            boxShadow: '0 28px 72px rgba(0,0,0,0.3)',
            opacity: pipProgress,
            transform: `translateY(${(1 - pipProgress) * 24}px) scale(${0.9 + pipProgress * 0.1})`,
            willChange: 'transform, opacity',
          }}
        >
          <AbsoluteFill style={presenterContentStyle}>{presenter}</AbsoluteFill>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
