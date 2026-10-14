import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {groupCaptionWords, type CaptionWord} from "./CaptionWords";

const DEFAULT_FONT = '"Arial Nova", Arial, Helvetica, sans-serif';

export type CaptionGlitchRgbProps = {
  words: CaptionWord[];
  fringeAColor?: string;
  fringeBColor?: string;
  textColor?: string;
  textShadowColor?: string;
  vignetteColor?: string;
  scanlineColor?: string;
  fontFamily?: string;
  fontSize?: number;
  bottom?: number;
  maxWordsPerGroup?: number;
  pauseThresholdMs?: number;
  showScanlines?: boolean;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const deterministicTravel = (index: number) => 8 + ((index * 7 + 5) % 7);

export const CaptionGlitchRgb = ({
  words,
  fringeAColor = "#EE6350",
  fringeBColor = "#66A4D9",
  textColor = "#FFFFFF",
  textShadowColor = "rgba(0,0,0,.58)",
  vignetteColor = "rgba(0,30,51,.58)",
  scanlineColor = "rgba(0,0,0,.32)",
  fontFamily = DEFAULT_FONT,
  fontSize = 84,
  bottom = 120,
  maxWordsPerGroup = 4,
  pauseThresholdMs = 150,
  showScanlines = true,
}: CaptionGlitchRgbProps) => {
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
    [group.startMs, group.startMs + 110],
    [0, 1],
    {...clamp, easing: Easing.out(Easing.cubic)},
  );
  const groupOut = interpolate(
    nowMs,
    [group.endMs - 90, group.endMs],
    [1, 0],
    {...clamp, easing: Easing.in(Easing.cubic)},
  );
  const groupOpacity = Math.min(groupIn, groupOut);

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, transparent 44%, transparent 58%, ${vignetteColor} 100%)`,
        }}
      />
      {showScanlines ? (
        <AbsoluteFill
          style={{
            opacity: 0.12,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, ${scanlineColor} 3px, ${scanlineColor} 4px)`,
          }}
        />
      ) : null}
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
          gap: 14,
          padding: "0 100px",
          opacity: groupOpacity,
          fontFamily,
        }}
      >
        {group.words.map((word) => {
          const wordIndex = words.indexOf(word);
          const availableMs = Math.max(
            80,
            Math.min(240, word.endMs - word.startMs - 20),
          );
          const attackEnd = word.startMs + availableMs * 0.35;
          const settleEnd = word.startMs + availableMs;
          const attack = interpolate(
            nowMs,
            [word.startMs, attackEnd],
            [0, 1],
            clamp,
          );
          const settle = interpolate(
            nowMs,
            [attackEnd, settleEnd],
            [1, 0],
            {...clamp, easing: Easing.out(Easing.cubic)},
          );
          const glitch = Math.min(attack, settle);
          const travel = deterministicTravel(wordIndex);
          const shadow = 5 + (wordIndex % 5);

          return (
            <span
              key={`${word.startMs}-${word.text}`}
              style={{
                display: "inline-block",
                color: textColor,
                fontSize,
                fontWeight: 900,
                letterSpacing: -0.7,
                lineHeight: 0.98,
                textShadow:
                  glitch > 0.01
                    ? `${shadow * glitch}px 0 ${fringeAColor}, ${-shadow * glitch}px 0 ${fringeBColor}, 0 5px 18px ${textShadowColor}`
                    : `0 5px 18px ${textShadowColor}`,
                transform: `translateX(${-travel * glitch}px) skewX(${-2.5 * glitch}deg)`,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
