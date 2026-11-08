import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type TranscriptWord = {text: string; startMs: number; endMs: number};
export type BlurredTranscriptProps = {
  presenter: ReactNode;
  words: TranscriptWord[];
  blurStartFrame?: number;
  blurFrames?: number;
  blurRadius?: number;
  dimOpacity?: number;
  fontSize?: number;
  textTop?: number;
  textColor?: string;
  underlineColor?: string;
  wordRevealFrames?: number;
  underlineDelayFrames?: number;
  underlineFrames?: number;
  clearFrame?: number;
  clearFrames?: number;
  restoreFrame?: number;
  restoreFrames?: number;
};

/** One speech-timed phrase accumulates over a continuously playing soft image.
 * startMs/endMs must be relative to this component's local timeline. Keep the
 * full phrase mounted invisibly so revealing words never shifts earlier words.
 */
export const BlurredTranscript = ({
  presenter,words,blurStartFrame=12,blurFrames=14,blurRadius=12,dimOpacity=.24,
  fontSize=92,textTop=.59,textColor='#FFFFFF',underlineColor='#FFFFFF',
  wordRevealFrames=3,underlineDelayFrames=6,underlineFrames=24,
  clearFrame=154,clearFrames=12,restoreFrame=166,restoreFrames=12,
}: BlurredTranscriptProps) => {
  const frame=useCurrentFrame();
  const {width,height,fps}=useVideoConfig();
  const scale=width/1920;
  const ease=(start:number,duration:number)=>interpolate(frame,[start,start+Math.max(1,duration)],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.4,0,.2,1)});
  const softened=Math.min(ease(blurStartFrame,blurFrames),1-ease(restoreFrame,restoreFrames));
  const radius=Math.max(0,blurRadius)*scale*softened;
  const clear=1-ease(clearFrame,clearFrames);
  const finalWordEnd=Math.max(0,...words.map(w=>Math.max(w.startMs,w.endMs)));
  const underlineStart=Math.round(finalWordEnd*fps/1000)+Math.max(0,underlineDelayFrames);
  const underline=words.length?ease(underlineStart,underlineFrames):0;
  return <AbsoluteFill style={{overflow:'hidden'}}>
    {/* Overscan protects all edges from the blur's transparent fringe. */}
    <AbsoluteFill style={{filter:`blur(${radius}px)`,transform:`scale(${1+6*radius/Math.min(width,height)})`,transformOrigin:'center'}}>{presenter}</AbsoluteFill>
    <AbsoluteFill style={{background:'#000000',opacity:Math.min(1,Math.max(0,dimOpacity))*softened}}/>
    <div style={{position:'absolute',top:height*textTop,left:width*.09,right:width*.09,display:'flex',justifyContent:'center',opacity:clear,pointerEvents:'none',fontFamily:'Arial Nova, Library Arial, Arial, sans-serif'}}>
      <div style={{position:'relative',display:'inline-flex',flexWrap:'wrap',justifyContent:'center',columnGap:fontSize*.25*scale,rowGap:fontSize*.12*scale,maxWidth:'100%',fontSize:fontSize*scale,lineHeight:1.12,fontWeight:700,letterSpacing:-fontSize*.025*scale,color:textColor,textShadow:'0 3px 6px rgba(0,0,0,.6), 0 0 20px rgba(255,255,255,.18)'}}>
        {words.map((word,i)=>{
          const cue=Math.round(word.startMs*fps/1000);
          // First visible pixels land exactly on the timestamp's rounded frame.
          const reveal=frame<cue?0:.25+.75*ease(cue,wordRevealFrames);
          return <span key={`${i}-${word.startMs}`} style={{opacity:reveal,translate:`0 ${(1-reveal)*5*scale}px`}}>{word.text}</span>;
        })}
        <svg viewBox="0 0 1000 24" preserveAspectRatio="none" style={{position:'absolute',left:0,top:`calc(100% + ${18*scale}px)`,width:'100%',height:18*scale,opacity:underline>0?1:0,overflow:'visible',filter:'drop-shadow(0 2px 3px rgba(0,0,0,.35))'}}>
          <path d="M2 12 C80 8 140 14 220 11 S360 8 450 11 S620 8 710 10 S860 8 998 12" stroke={underlineColor} strokeWidth={7} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-underline}/>
          <path d="M4 14 Q270 12 505 13 T996 14" stroke={underlineColor} strokeOpacity={.35} strokeWidth={1.8} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-underline}/>
        </svg>
      </div>
    </div>
  </AbsoluteFill>;
};
