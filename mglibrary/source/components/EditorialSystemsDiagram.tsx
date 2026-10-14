import type {ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type EditorialSystemNode = {
  id: string;
  title: string;
  detail?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  revealFrame: number;
  accent?: boolean;
};

export type EditorialSystemConnection = {
  id: string;
  path: string;
  revealFrame: number;
  drawDuration?: number;
  dashed?: boolean;
  arrow?: boolean;
};

export type EditorialSystemMarker = {
  id: string;
  label: string;
  x: number;
  y: number;
  revealFrame: number;
};

export type EditorialSystemsDiagramProps = {
  nodes: EditorialSystemNode[];
  connections: EditorialSystemConnection[];
  markers?: EditorialSystemMarker[];
  kicker?: string;
  presenter?: ReactNode;
  presenterRect?: {x: number; y: number; width: number; height: number};
  background?: string;
  gridColor?: string;
  accentColor?: string;
  headingColor?: string;
  bodyColor?: string;
  fontFamily?: string;
  headingFontFamily?: string;
};

const reveal = (frame: number, start: number, duration = 16) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const EditorialSystemsDiagram = ({
  nodes,
  connections,
  markers = [],
  kicker,
  presenter,
  presenterRect,
  background = "#F6F7F7",
  gridColor = "rgba(110,111,113,0.13)",
  accentColor = "#0076BD",
  headingColor = "#004472",
  bodyColor = "#6E6F71",
  fontFamily = '"Arial Nova", Arial, Helvetica, sans-serif',
  headingFontFamily = '"Arial Nova", Arial, Helvetica, sans-serif',
}: EditorialSystemsDiagramProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const pip = presenterRect ?? {
    x: width * 0.04,
    y: height * 0.765,
    width: width * 0.19,
    height: height * 0.19,
  };

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background,
        color: headingColor,
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: [
            `linear-gradient(${gridColor} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.8), transparent 58%)`,
          ].join(","),
          backgroundSize: "104px 104px, 104px 104px, 100% 100%",
        }}
      />

      {kicker ? (
        <div
          style={{
            position: "absolute",
            left: width * 0.05,
            top: height * 0.055,
            color: bodyColor,
            fontSize: width * 0.016,
            fontWeight: 700,
            letterSpacing: width * 0.003,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
      ) : null}

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{position: "absolute", inset: 0}}
      >
        <defs>
          <marker
            id="editorial-system-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accentColor} />
          </marker>
        </defs>
        {connections.map((connection) => {
          const progress = reveal(
            frame,
            connection.revealFrame,
            connection.drawDuration ?? 20,
          );

          return (
            <path
              key={connection.id}
              d={connection.path}
              fill="none"
              stroke={accentColor}
              strokeWidth={Math.max(4, width * 0.003)}
              strokeLinecap="round"
              strokeDasharray={connection.dashed ? "10 12" : 1}
              pathLength={connection.dashed ? undefined : 1}
              strokeDashoffset={connection.dashed ? 0 : 1 - progress}
              opacity={progress}
              markerEnd={
                connection.arrow !== false && progress > 0.97
                  ? "url(#editorial-system-arrow)"
                  : undefined
              }
            />
          );
        })}
      </svg>

      {nodes.map((node) => {
        const progress = reveal(frame, node.revealFrame);

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 28px",
              borderRadius: 22,
              border: `2px solid ${
                node.accent ? accentColor : "rgba(110,111,113,0.22)"
              }`,
              background: node.accent ? accentColor : "rgba(255,255,255,0.96)",
              boxShadow: "0 20px 54px rgba(0,68,114,0.13)",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 22}px) scale(${0.97 + progress * 0.03})`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: node.accent ? "#FFFFFF" : headingColor,
                fontFamily: headingFontFamily,
                fontSize: Math.min(node.height * 0.34, node.width * 0.12),
                fontWeight: 700,
                lineHeight: 1.02,
              }}
            >
              {node.title}
            </div>
            {node.detail ? (
              <div
                style={{
                  marginTop: 12,
                  color: node.accent ? "rgba(255,255,255,0.82)" : bodyColor,
                  fontSize: Math.min(node.height * 0.19, node.width * 0.064),
                  lineHeight: 1.18,
                }}
              >
                {node.detail}
              </div>
            ) : null}
          </div>
        );
      })}

      {markers.map((marker) => {
        const progress = reveal(frame, marker.revealFrame, 12);

        return (
          <div
            key={marker.id}
            style={{
              position: "absolute",
              left: marker.x,
              top: marker.y,
              width: 54,
              height: 54,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: accentColor,
              color: "#FFFFFF",
              border: "4px solid rgba(255,255,255,0.9)",
              boxShadow: "0 10px 26px rgba(0,68,114,0.18)",
              fontSize: 23,
              fontWeight: 700,
              opacity: progress,
              transform: `scale(${0.72 + progress * 0.28})`,
            }}
          >
            {marker.label}
          </div>
        );
      })}

      {presenter ? (
        <div
          style={{
            position: "absolute",
            left: pip.x,
            top: pip.y,
            width: pip.width,
            height: pip.height,
            overflow: "hidden",
            borderRadius: 18,
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
          }}
        >
          {presenter}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
