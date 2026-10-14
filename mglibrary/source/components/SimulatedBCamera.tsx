import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Video} from '@remotion/media';

export type BCameraCut = {
  id: string;
  from: number;
  durationInFrames: number;
  src: string;
  /** Generated-media offset in composition frames. */
  trimBefore?: number;
};

/** Keep the original presenter/audio mounted; layer muted, synchronized angles.
 * All cut frames are local to this wrapper on the edited timeline.
 */
export const SimulatedBCamera = ({presenter, cuts}: {
  presenter: React.ReactNode;
  cuts: BCameraCut[];
}) => {
  const ordered = [...cuts].sort((a, b) => a.from - b.from);
  ordered.forEach((cut, i) => {
    if (![cut.from, cut.durationInFrames, cut.trimBefore ?? 0].every(Number.isInteger) ||
      cut.from < 0 || cut.durationInFrames < 1 || (cut.trimBefore ?? 0) < 0 ||
      (i > 0 && ordered[i - 1].from + ordered[i - 1].durationInFrames > cut.from)) {
      throw new Error('B-camera cuts require non-overlapping integer frame ranges.');
    }
  });
  return <AbsoluteFill>
    {presenter}
    {ordered.map(cut => <Sequence key={cut.id} name={`B camera: ${cut.id}`}
      from={cut.from} durationInFrames={cut.durationInFrames}>
      <AbsoluteFill style={{background: '#000'}}>
        <Video src={cut.src} trimBefore={cut.trimBefore ?? 0} muted
          objectFit="cover" style={{width: '100%', height: '100%'}} />
      </AbsoluteFill>
    </Sequence>)}
  </AbsoluteFill>;
};
