import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLORS = {
  blue: "#0076BD",
  darkBlue: "#004472",
  lightBlue: "#66A4D9",
  white: "#FFFFFF",
} as const;

const FONT_FAMILY = '"Arial Nova", Arial, Helvetica, sans-serif';

export type EditorialSplitItem = {
  number: string;
  title: string;
  detail: string;
  revealFrame: number;
};

export type PatternedEditorialSplitProps = {
  kicker: string;
  headline: string;
  items: EditorialSplitItem[];
  video: ReactNode;
  presenterLabel?: string;
  videoSide?: "left" | "right";
};

const reveal = (frame: number, start: number, duration = 18) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const PatternedEditorialSplit = ({
  kicker,
  headline,
  items,
  video,
  presenterLabel,
  videoSide = "right",
}: PatternedEditorialSplitProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    durationInFrames: 28,
    config: { damping: 20, stiffness: 125, mass: 0.9 },
  });
  const exit = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    },
  );
  const activeIndex = items.reduce(
    (latest, item, index) => (frame >= item.revealFrame ? index : latest),
    -1,
  );
  const videoOnRight = videoSide === "right";

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: COLORS.darkBlue,
        color: COLORS.white,
        fontFamily: FONT_FAMILY,
        opacity: exit,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: [
            "radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.8px)",
            "linear-gradient(rgba(102,164,217,0.2) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(102,164,217,0.2) 1px, transparent 1px)",
            "linear-gradient(rgba(102,164,217,0.12) 2px, transparent 2px)",
            "linear-gradient(90deg, rgba(102,164,217,0.12) 2px, transparent 2px)",
            "radial-gradient(circle at 18% 15%, rgba(0,118,189,0.24), transparent 33%)",
          ].join(","),
          backgroundSize:
            "84px 84px, 84px 84px, 84px 84px, 336px 336px, 336px 336px, 100% 100%",
          backgroundPosition: `${-frame * 0.08}px ${-frame * 0.05}px`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 58,
          border: "1px solid rgba(102,164,217,0.24)",
          borderRadius: 36,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: videoOnRight ? 112 : 1018,
          top: 88,
          width: 790,
          height: 904,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: entrance,
          transform: `translateX(${(1 - entrance) * (videoOnRight ? -54 : 54)}px)`,
        }}
      >
        <div
          style={{
            color: COLORS.lightBlue,
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 0.8,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            width: 735,
            marginTop: 24,
            fontSize: 56,
            lineHeight: 1.04,
            fontWeight: 700,
            letterSpacing: -2.4,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "grid",
            gap: 16,
            marginTop: 46,
          }}
        >
          {items.map((item, index) => {
            const progress = reveal(frame, item.revealFrame);
            const isActive = index === activeIndex;

            return (
              <div
                key={`${item.number}-${item.title}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: 20,
                  alignItems: "center",
                  minHeight: 124,
                  padding: "20px 24px",
                  border: `2px solid ${
                    isActive
                      ? "rgba(102,164,217,0.95)"
                      : "rgba(255,255,255,0.16)"
                  }`,
                  borderRadius: 22,
                  background: isActive
                    ? "rgba(0,118,189,0.3)"
                    : "rgba(0,42,72,0.42)",
                  opacity: progress * (isActive ? 1 : 0.78),
                  transform: `translateX(${(1 - progress) * -32}px)`,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 60,
                    height: 60,
                    borderRadius: 17,
                    background: isActive
                      ? COLORS.blue
                      : "rgba(255,255,255,0.1)",
                    fontSize: 23,
                    fontWeight: 700,
                  }}
                >
                  {item.number}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 31,
                      lineHeight: 1.08,
                      fontWeight: 700,
                      letterSpacing: -0.7,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 20,
                      lineHeight: 1.24,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: videoOnRight ? 1018 : 112,
          top: 104,
          width: 750,
          height: 872,
          borderRadius: 38,
          overflow: "hidden",
          background: "#111111",
          border: "2px solid rgba(102,164,217,0.55)",
          boxShadow: "0 34px 90px rgba(0,20,36,0.5)",
          opacity: entrance,
          transform: `translateX(${
            (1 - entrance) * (videoOnRight ? 120 : -120)
          }px) scale(${0.96 + entrance * 0.04})`,
        }}
      >
        {video}
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            boxShadow: "inset 0 0 90px rgba(0,0,0,0.18)",
          }}
        />
        {presenterLabel ? (
          <div
            style={{
              position: "absolute",
              left: 30,
              bottom: 28,
              padding: "13px 18px",
              borderRadius: 14,
              background: "rgba(0,68,114,0.86)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {presenterLabel}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
