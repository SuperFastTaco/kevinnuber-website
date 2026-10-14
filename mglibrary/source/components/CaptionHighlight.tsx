import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {groupCaptionWords, type CaptionWord} from "./CaptionWords";

const DEFAULT_FONT = '"Arial Nova", Arial, Helvetica, sans-serif';

export type CaptionHighlightProps = {
  words: CaptionWord[];
  accentColor?: string;
  accentShadowColor?: string;
  textColor?: string;
  textShadowColor?: string;
  fontFamily?: string;
  fontSize?: number;
  bottom?: number;
  maxWordsPerGroup?: number;
  pauseThresholdMs?: number;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const CaptionHighlight = ({
  words,
  accentColor = "#EE6350",
  accentShadowColor = "rgba(238,99,80,.27)",
  textColor = "#FFFFFF",
  textShadowColor = "rgba(0,0,0,.55)",
  fontFamily = DEFAULT_FONT,
  fontSize = 80,
  bottom = 135,
  maxWordsPerGroup = 4,
  pauseThresholdMs = 150,
}: CaptionHighlightProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const groups = groupCaptionWords(words, maxWordsPerGroup, pauseThresholdMs);
  const group = groups.find(
    (candidate) => nowMs >= candidate.startMs && nowMs < candidate.endMs,
  );

  if (!group) return null;

  const groupIn = interpolate(
    nowMs,
    [group.startMs, group.startMs + 120],
    [0, 1],
    {...clamp, easing: Easing.out(Easing.cubic)},
  );
  const groupOut = interpolate(
    nowMs,
    [group.endMs - 100, group.endMs],
    [1, 0],
    {...clamp, easing: Easing.in(Easing.cubic)},
  );
  const groupOpacity = Math.min(groupIn, groupOut);

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 8,
          padding: "0 100px",
          opacity: groupOpacity,
          transform: `translateY(${(1 - groupIn) * 12}px)`,
          fontFamily,
        }}
      >
        {group.words.map((word) => {
          const sweepIn = interpolate(
            nowMs,
            [word.startMs, word.startMs + 150],
            [0, 1],
            {...clamp, easing: Easing.out(Easing.cubic)},
          );
          const sweepOut = interpolate(
            nowMs,
            [word.endMs, word.endMs + 100],
            [1, 0],
            {...clamp, easing: Easing.in(Easing.cubic)},
          );
          const highlight = Math.min(sweepIn, sweepOut);

          return (
            <span
              key={`${word.startMs}-${word.text}`}
              style={{
                position: "relative",
                display: "inline-block",
                padding: "7px 12px 9px",
                color: textColor,
                fontSize,
                fontWeight: 900,
                letterSpacing: -1.2,
                lineHeight: 1,
                textShadow: `0 6px 18px ${textShadowColor}`,
                transform: `scale(${1 + highlight * 0.025})`,
                transformOrigin: "50% 60%",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: -1,
                  borderRadius: 10,
                  background: accentColor,
                  boxShadow: `0 12px 30px ${accentShadowColor}`,
                  opacity: highlight,
                  transform: `scaleX(${highlight})`,
                  transformOrigin: "left center",
                }}
              />
              {word.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
