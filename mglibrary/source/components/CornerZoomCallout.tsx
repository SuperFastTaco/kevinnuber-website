import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type CornerZoomCalloutProps = {
  presenter: ReactNode;
  content: ReactNode;
  /** The graphic corner; the speaker moves toward the opposite side. */
  corner?: 'top-left' | 'top-right';
  zoom?: number;
  topCrop?: number;
  zoomStartFrame?: number;
  zoomFrames?: number;
  revealFrame?: number;
  revealFrames?: number;
  clearFrame?: number;
  clearFrames?: number;
  returnFrame?: number;
  returnFrames?: number;
};

/** Full-bleed lateral reframe, with a screen-space corner graphic.
 * Based on Sell the Destination's presenterCrop + Overlays treatment.
 * Keep one presenter node mounted throughout; never mirror the footage.
 */
export const CornerZoomCallout = ({
  presenter, content, corner = 'top-right', zoom = 1.22, topCrop = 0.04,
  zoomStartFrame = 18, zoomFrames = 26, revealFrame = 46, revealFrames = 16,
  clearFrame = 132, clearFrames = 12, returnFrame = 148, returnFrames = 24,
}: CornerZoomCalloutProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const ease = (start: number, duration: number) => interpolate(
    frame, [start, start + Math.max(1, duration)], [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1)},
  );
  const progress = Math.min(ease(zoomStartFrame, zoomFrames), 1 - ease(returnFrame, returnFrames));
  const extra = Math.max(0, zoom - 1) * progress;
  const visible = Math.min(ease(revealFrame, revealFrames), 1 - ease(clearFrame, clearFrames));
  // Translation stays inside the enlarged image's excess, preventing exposed edges.
  const x = corner === 'top-right' ? -width * extra : 0;
  const y = -height * Math.min(Math.max(0, topCrop) * progress, extra);
  return <AbsoluteFill style={{overflow: 'hidden'}}>
    <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) scale(${1 + extra})`, transformOrigin: '0 0'}}>
      {presenter}
    </AbsoluteFill>
    <div style={{
      position: 'absolute', top: height * 0.13,
      left: corner === 'top-left' ? width * 0.055 : undefined,
      right: corner === 'top-right' ? width * 0.055 : undefined,
      width: width * 0.33, opacity: visible,
      transform: `translateY(${(1 - visible) * 20}px)`,
      pointerEvents: 'none',
    }}>{content}</div>
  </AbsoluteFill>;
};
