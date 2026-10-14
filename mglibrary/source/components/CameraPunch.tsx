import type { ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export type CameraPunchCue = {
  startFrame: number;
  endFrame: number;
  scale?: number;
  transitionFrames?: number;
  focusX?: number;
  focusY?: number;
  offsetX?: number;
  offsetY?: number;
};

export type CameraPunchProps = {
  children: ReactNode;
  cues: CameraPunchCue[];
};

const cueProgress = (frame: number, cue: CameraPunchCue) => {
  if (frame < cue.startFrame || frame > cue.endFrame) {
    return 0;
  }

  const cueDuration = Math.max(2, cue.endFrame - cue.startFrame);
  const transitionFrames = Math.min(
    cue.transitionFrames ?? 12,
    Math.floor(cueDuration / 2),
  );
  const enter = interpolate(
    frame,
    [cue.startFrame, cue.startFrame + transitionFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const exit = interpolate(
    frame,
    [cue.endFrame - transitionFrames, cue.endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    },
  );

  return Math.min(enter, exit);
};

export const CameraPunch = ({ children, cues }: CameraPunchProps) => {
  const frame = useCurrentFrame();
  const activeCue = cues.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame,
  );
  const progress = activeCue ? cueProgress(frame, activeCue) : 0;
  const targetScale = activeCue?.scale ?? 1.08;
  const scale = 1 + (targetScale - 1) * progress;
  const offsetX = (activeCue?.offsetX ?? 0) * progress;
  const offsetY = (activeCue?.offsetY ?? 0) * progress;
  const focusX = activeCue?.focusX ?? 50;
  const focusY = activeCue?.focusY ?? 38;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          transformOrigin: `${focusX}% ${focusY}%`,
          willChange: "transform",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
