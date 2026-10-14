export type CaptionWord = {
  text: string;
  startMs: number;
  endMs: number;
  breakAfter?: boolean;
};

export type CaptionWordGroup = {
  words: CaptionWord[];
  startMs: number;
  endMs: number;
};

export const groupCaptionWords = (
  words: CaptionWord[],
  maxWords = 4,
  pauseThresholdMs = 150,
): CaptionWordGroup[] => {
  const rawGroups: CaptionWord[][] = [];
  let current: CaptionWord[] = [];

  words.forEach((word, index) => {
    current.push(word);
    const next = words[index + 1];
    const punctuation = /[,.:!?]$/.test(word.text);
    const pause = next ? next.startMs - word.endMs : Number.POSITIVE_INFINITY;
    const shouldBreak =
      word.breakAfter ||
      punctuation ||
      pause >= pauseThresholdMs ||
      current.length >= maxWords ||
      !next;

    if (shouldBreak) {
      rawGroups.push(current);
      current = [];
    }
  });

  return rawGroups.map((group, index) => {
    const nextStart = rawGroups[index + 1]?.[0].startMs;
    const lastWord = group[group.length - 1];
    return {
      words: group,
      startMs: group[0].startMs,
      endMs: nextStart ?? lastWord.endMs + 120,
    };
  });
};
