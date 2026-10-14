import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type FullFrameBridgeRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type FullFrameBridgeCrop = {
  scale: number;
  translateX: number;
  translateY: number;
  originX: number;
  originY: number;
};

export type FullFramePresenterBridgeProps = {
  video: ReactNode;
  graphic: ReactNode;
  sceneDurationInFrames: number;
  target: FullFrameBridgeRect;
  enterFrames?: number;
  exitFrames?: number;
  fullRect?: Partial<FullFrameBridgeRect>;
  fullCrop?: Partial<FullFrameBridgeCrop>;
  targetCrop?: Partial<FullFrameBridgeCrop>;
  cardBackground?: string;
  borderColor?: string;
  borderWidth?: number;
  shadowColor?: string;
  contentStyle?: CSSProperties;
};

const cropDefaults: FullFrameBridgeCrop = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  originX: 50,
  originY: 38,
};

const mix = (from: number, to: number, progress: number) =>
  interpolate(progress, [0, 1], [from, to]);

const easedProgress = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const FullFramePresenterBridge = ({
  video,
  graphic,
  sceneDurationInFrames,
  target,
  enterFrames = 20,
  exitFrames = 20,
  fullRect,
  fullCrop,
  targetCrop,
  cardBackground = "#001E33",
  borderColor = "rgba(0,118,189,0.34)",
  borderWidth = 1,
  shadowColor = "rgba(0,30,51,0.22)",
  contentStyle,
}: FullFramePresenterBridgeProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const full: FullFrameBridgeRect = {
    x: 0,
    y: 0,
    width,
    height,
    borderRadius: 0,
    ...fullRect,
  };
  const cropStart = {...cropDefaults, ...fullCrop};
  const cropEnd = {...cropDefaults, ...targetCrop};
  const exitStart = Math.max(
    enterFrames,
    sceneDurationInFrames - exitFrames - 1,
  );
  const enter = easedProgress(frame, 0, enterFrames);
  const exit = easedProgress(frame, exitStart, exitFrames);
  const cardProgress = frame >= exitStart ? 1 - exit : enter;
  const rect: FullFrameBridgeRect = {
    x: mix(full.x, target.x, cardProgress),
    y: mix(full.y, target.y, cardProgress),
    width: mix(full.width, target.width, cardProgress),
    height: mix(full.height, target.height, cardProgress),
    borderRadius: mix(full.borderRadius, target.borderRadius, cardProgress),
  };
  const crop: FullFrameBridgeCrop = {
    scale: mix(cropStart.scale, cropEnd.scale, cardProgress),
    translateX: mix(
      cropStart.translateX,
      cropEnd.translateX,
      cardProgress,
    ),
    translateY: mix(
      cropStart.translateY,
      cropEnd.translateY,
      cardProgress,
    ),
    originX: mix(cropStart.originX, cropEnd.originX, cardProgress),
    originY: mix(cropStart.originY, cropEnd.originY, cardProgress),
  };

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <AbsoluteFill>{graphic}</AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height,
          overflow: "hidden",
          borderRadius: rect.borderRadius,
          background: cardBackground,
          border: `${borderWidth * cardProgress}px solid ${borderColor}`,
          boxShadow: `0 ${28 * cardProgress}px ${80 * cardProgress}px ${shadowColor}`,
          boxSizing: "border-box",
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
