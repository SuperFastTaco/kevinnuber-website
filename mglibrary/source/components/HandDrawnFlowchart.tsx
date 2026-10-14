import {Easing, interpolate, useCurrentFrame} from "remotion";

const DEFAULT_COLORS = {
  ink: "#FFFFFF",
  accent: "#F3DE89",
  panel: "#001E33",
} as const;

const DEFAULT_FONT = '"Arial Nova", Arial, Helvetica, sans-serif';

export type HandDrawnFlowchartNode = {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  revealFrame: number;
  number?: string;
  eyebrow?: string;
  detail?: string;
  textScale?: number;
};

export type HandDrawnFlowchartConnector = {
  from: string;
  to: string;
  revealFrame: number;
};

export type HandDrawnFlowchartProps = {
  nodes: HandDrawnFlowchartNode[];
  connectors: HandDrawnFlowchartConnector[];
  canvasWidth?: number;
  canvasHeight?: number;
  inkColor?: string;
  accentColor?: string;
  panelColor?: string;
  fontFamily?: string;
  drawFrames?: number;
  highlightLatest?: boolean;
};

const progressAt = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const roughRectanglePath = (width: number, height: number, variant: 0 | 1) => {
  const inset = variant === 0 ? 9 : 13;
  const drift = variant === 0 ? 0 : 4;

  return [
    `M ${inset + 20} ${inset + drift}`,
    `C ${Math.round(width * 0.28)} ${inset - 3}, ${Math.round(width * 0.7)} ${inset + 3}, ${width - inset - 20} ${inset + 1}`,
    `Q ${width - inset + 4} ${inset + 1}, ${width - inset + 1} ${inset + 22}`,
    `C ${width - inset - 2} ${Math.round(height * 0.35)}, ${width - inset + 2} ${Math.round(height * 0.72)}, ${width - inset - 2} ${height - inset - 20}`,
    `Q ${width - inset - 3} ${height - inset + 2}, ${width - inset - 24} ${height - inset}`,
    `C ${Math.round(width * 0.7)} ${height - inset + 3}, ${Math.round(width * 0.3)} ${height - inset - 3}, ${inset + 22} ${height - inset + 1}`,
    `Q ${inset - 2} ${height - inset - 1}, ${inset + 1} ${height - inset - 23}`,
    `C ${inset + 4} ${Math.round(height * 0.68)}, ${inset - 3} ${Math.round(height * 0.35)}, ${inset + 2} ${inset + 20}`,
    `Q ${inset + 3} ${inset + 1}, ${inset + 20} ${inset + drift}`,
    "Z",
  ].join(" ");
};

const SketchNode = ({
  node,
  index,
  isCurrent,
  inkColor,
  accentColor,
  panelColor,
  drawFrames,
}: {
  node: HandDrawnFlowchartNode;
  index: number;
  isCurrent: boolean;
  inkColor: string;
  accentColor: string;
  panelColor: string;
  drawFrames: number;
}) => {
  const frame = useCurrentFrame();
  const draw = progressAt(frame, node.revealFrame, drawFrames);
  const copy = progressAt(
    frame,
    node.revealFrame + Math.round(drawFrames * 0.55),
    12,
  );
  const current = isCurrent
    ? progressAt(frame, node.revealFrame + drawFrames, 10)
    : 0;
  const settle = interpolate(current, [0, 1], [1, 1.018]);
  const textScale = node.textScale ?? 1;

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.width,
        height: node.height,
        transform: `scale(${settle}) rotate(${index % 2 === 0 ? -0.35 : 0.3}deg)`,
        transformOrigin: "center",
      }}
    >
      <svg
        viewBox={`0 0 ${node.width} ${node.height}`}
        width={node.width}
        height={node.height}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          opacity: Math.min(1, draw * 10),
        }}
      >
        <path
          d={roughRectanglePath(node.width, node.height, 0)}
          pathLength={1}
          fill={panelColor}
          fillOpacity={0.72 + current * 0.18}
          stroke={accentColor}
          strokeOpacity={0.22 + current * 0.26}
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        <path
          d={roughRectanglePath(node.width, node.height, 1)}
          pathLength={1}
          fill="none"
          stroke={inkColor}
          strokeOpacity={0.42 + current * 0.58}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: "30px 34px 26px",
          color: inkColor,
          opacity: copy,
          transform: `translateY(${(1 - copy) * 14}px)`,
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: 13}}>
          <div
            style={{
              width: 42 * textScale,
              height: 42 * textScale,
              flex: "0 0 auto",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: current > 0.5 ? accentColor : `${accentColor}24`,
              border: `2px solid ${accentColor}`,
              color: current > 0.5 ? panelColor : accentColor,
              fontSize: 17 * textScale,
              fontWeight: 900,
            }}
          >
            {node.number ?? String(index + 1).padStart(2, "0")}
          </div>
          {node.eyebrow ? (
            <div
              style={{
                fontSize: 17 * textScale,
                fontWeight: 800,
                letterSpacing: 1.4,
                color: accentColor,
              }}
            >
              {node.eyebrow}
            </div>
          ) : null}
        </div>
        <div
          style={{
            fontSize: 35 * textScale,
            lineHeight: 1.02,
            fontWeight: 900,
            marginTop: 14,
          }}
        >
          {node.title}
        </div>
        {node.detail ? (
          <div
            style={{
              fontSize: 18 * textScale,
              lineHeight: 1.25,
              color: "rgba(255,255,255,.65)",
              marginTop: 8,
            }}
          >
            {node.detail}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SketchConnector = ({
  connector,
  nodes,
  inkColor,
  accentColor,
  drawFrames,
  canvasWidth,
  canvasHeight,
}: {
  connector: HandDrawnFlowchartConnector;
  nodes: HandDrawnFlowchartNode[];
  inkColor: string;
  accentColor: string;
  drawFrames: number;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  const frame = useCurrentFrame();
  const from = nodes.find((node) => node.id === connector.from);
  const to = nodes.find((node) => node.id === connector.to);

  if (!from || !to) return null;

  const draw = progressAt(frame, connector.revealFrame, drawFrames);
  const arrow = progressAt(
    frame,
    connector.revealFrame + Math.round(drawFrames * 0.68),
    7,
  );
  const x1 = from.x + from.width - 3;
  const y1 = from.y + from.height / 2;
  const x2 = to.x + 3;
  const y2 = to.y + to.height / 2;
  const span = x2 - x1;
  const path = `M ${x1} ${y1} C ${x1 + span * 0.32} ${y1 - 8}, ${x1 + span * 0.66} ${y2 + 10}, ${x2} ${y2}`;

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      style={{
        position: "absolute",
        inset: 0,
        opacity: Math.min(1, draw * 10),
      }}
    >
      <path
        d={path}
        pathLength={1}
        fill="none"
        stroke={inkColor}
        strokeOpacity={0.2}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
      <path
        d={path}
        pathLength={1}
        fill="none"
        stroke={accentColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
      <path
        d={`M ${x2 - 17} ${y2 - 13} L ${x2} ${y2} L ${x2 - 20} ${y2 + 12}`}
        fill="none"
        stroke={accentColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={arrow}
      />
    </svg>
  );
};

export const HandDrawnFlowchart = ({
  nodes,
  connectors,
  canvasWidth = 1920,
  canvasHeight = 1080,
  inkColor = DEFAULT_COLORS.ink,
  accentColor = DEFAULT_COLORS.accent,
  panelColor = DEFAULT_COLORS.panel,
  fontFamily = DEFAULT_FONT,
  drawFrames = 18,
  highlightLatest = true,
}: HandDrawnFlowchartProps) => {
  const frame = useCurrentFrame();
  const visibleNodes = nodes.filter((node) => frame >= node.revealFrame);
  const currentId = highlightLatest
    ? visibleNodes[visibleNodes.length - 1]?.id
    : undefined;

  return (
    <div style={{position: "absolute", inset: 0, fontFamily}}>
      {connectors.map((connector, index) => (
        <SketchConnector
          key={`${connector.from}-${connector.to}-${index}`}
          connector={connector}
          nodes={nodes}
          inkColor={inkColor}
          accentColor={accentColor}
          drawFrames={drawFrames}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      ))}
      {nodes.map((node, index) => (
        <SketchNode
          key={node.id}
          node={node}
          index={index}
          isCurrent={node.id === currentId}
          inkColor={inkColor}
          accentColor={accentColor}
          panelColor={panelColor}
          drawFrames={drawFrames}
        />
      ))}
    </div>
  );
};
