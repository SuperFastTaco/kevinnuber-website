import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type PresenterCardMorphPreset = "sideSwapBridge" | "pipToSplit";

export type PresenterCardRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type PresenterCropTransform = {
  scale: number;
  translateX: number;
  translateY: number;
  originX: number;
  originY: number;
};

export type PresenterCardMorphProps = {
  video: ReactNode;
  preset: PresenterCardMorphPreset;
  startFrame: number;
  durationInFrames?: number;
  from?: Partial<PresenterCardRect>;
  to?: Partial<PresenterCardRect>;
  fromCrop?: Partial<PresenterCropTransform>;
  toCrop?: Partial<PresenterCropTransform>;
  fromScene?: ReactNode;
  toScene?: ReactNode;
  sceneTransition?: "crossfade" | "cut";
  sceneBlendRange?: [number, number];
  cardBackground?: string;
  border?: string;
  boxShadow?: string;
  contentStyle?: CSSProperties;
};

const cropDefaults: PresenterCropTransform = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  originX: 50,
  originY: 38,
};

const presetRects = (
  preset: PresenterCardMorphPreset,
  width: number,
  height: number,
): {from: PresenterCardRect; to: PresenterCardRect} => {
  const splitWidth = width * 0.395;
  const splitHeight = height * 0.8;
  const splitTop = height * 0.1;

  if (preset === "sideSwapBridge") {
    return {
      from: {
        x: width * 0.55,
        y: splitTop,
        width: splitWidth,
        height: splitHeight,
        borderRadius: width * 0.012,
      },
      to: {
        x: width * 0.055,
        y: splitTop,
        width: splitWidth,
        height: splitHeight,
        borderRadius: width * 0.012,
      },
    };
  }

  return {
    from: {
      x: width * 0.038,
      y: height * 0.765,
      width: width * 0.18,
      height: height * 0.18,
      borderRadius: width * 0.009,
    },
    to: {
      x: width * 0.55,
      y: splitTop,
      width: splitWidth,
      height: splitHeight,
      borderRadius: width * 0.012,
    },
  };
};

const mergeRect = (
  base: PresenterCardRect,
  override?: Partial<PresenterCardRect>,
): PresenterCardRect => ({...base, ...override});

const mergeCrop = (
  override?: Partial<PresenterCropTransform>,
): PresenterCropTransform => ({...cropDefaults, ...override});

const mix = (from: number, to: number, progress: number) =>
  interpolate(progress, [0, 1], [from, to]);

export const PresenterCardMorph = ({
  video,
  preset,
  startFrame,
  durationInFrames,
  from,
  to,
  fromCrop,
  toCrop,
  fromScene,
  toScene,
  sceneTransition = "crossfade",
  sceneBlendRange = [0.34, 0.66],
  cardBackground = "#111111",
  border = "1px solid rgba(255,255,255,0.28)",
  boxShadow = "0 28px 76px rgba(0,0,0,0.28)",
  contentStyle,
}: PresenterCardMorphProps) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const defaults = presetRects(preset, width, height);
  const fromRect = mergeRect(defaults.from, from);
  const toRect = mergeRect(defaults.to, to);
  const cropStart = mergeCrop(fromCrop);
  const cropEnd = mergeCrop(toCrop);
  const transitionFrames = Math.max(
    1,
    durationInFrames ?? Math.round(fps * 0.83),
  );
  const progress = interpolate(
    frame,
    [startFrame, startFrame + transitionFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const [blendStart, blendEnd] = sceneBlendRange;
  const sceneMix =
    sceneTransition === "cut"
      ? progress >= (blendStart + blendEnd) / 2
        ? 1
        : 0
      : interpolate(progress, [blendStart, blendEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const cardRect: PresenterCardRect = {
    x: mix(fromRect.x, toRect.x, progress),
    y: mix(fromRect.y, toRect.y, progress),
    width: mix(fromRect.width, toRect.width, progress),
    height: mix(fromRect.height, toRect.height, progress),
    borderRadius: mix(
      fromRect.borderRadius,
      toRect.borderRadius,
      progress,
    ),
  };
  const crop: PresenterCropTransform = {
    scale: mix(cropStart.scale, cropEnd.scale, progress),
    translateX: mix(cropStart.translateX, cropEnd.translateX, progress),
    translateY: mix(cropStart.translateY, cropEnd.translateY, progress),
    originX: mix(cropStart.originX, cropEnd.originX, progress),
    originY: mix(cropStart.originY, cropEnd.originY, progress),
  };

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      {fromScene ? (
        <AbsoluteFill style={{opacity: toScene ? 1 - sceneMix : 1}}>
          {fromScene}
        </AbsoluteFill>
      ) : null}
      {toScene ? (
        <AbsoluteFill style={{opacity: fromScene ? sceneMix : 1}}>
          {toScene}
        </AbsoluteFill>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: cardRect.x,
          top: cardRect.y,
          width: cardRect.width,
          height: cardRect.height,
          overflow: "hidden",
          borderRadius: cardRect.borderRadius,
          background: cardBackground,
          border,
          boxShadow,
          willChange: "left, top, width, height, border-radius",
        }}
      >
        <AbsoluteFill
          style={{
            ...contentStyle,
            transform: `translate(${crop.translateX}px, ${crop.translateY}px) scale(${crop.scale})`,
            transformOrigin: `${crop.originX}% ${crop.originY}%`,
            willChange: "transform",
          }}
        >
          {video}
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
