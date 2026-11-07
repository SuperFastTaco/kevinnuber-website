import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type ZoomTextLine = {text: string; fontSize: number; revealFrame: number; color?: string};
export type ZoomBoldTextProps = {
  presenter: ReactNode;
  lines: ZoomTextLine[];
  textSide?: 'left' | 'right';
  zoom?: number;
  topCrop?: number;
  zoomStartFrame?: number;
  zoomFrames?: number;
  revealFrames?: number;
  clearFrame?: number;
  clearFrames?: number;
  returnFrame?: number;
  returnFrames?: number;
  textTop?: number;
  textWidth?: number;
  textShadow?: string;
  scrimOpacity?: number;
};

/** Full-frame footage → lateral zoom → oversized shadowed type.
 * Keep one presenter node mounted; change transforms, never restart the clip.
 * Text sizes are in 1920×1080 design pixels and scale with composition width.
 */
export const ZoomBoldText = ({
  presenter, lines, textSide='left', zoom=1.3, topCrop=.055,
  zoomStartFrame=18, zoomFrames=28, revealFrames=14,
  clearFrame=136, clearFrames=12, returnFrame=150, returnFrames=24,
  textTop=.25, textWidth=.43,
  textShadow='0 8px 2px rgba(0,0,0,.45), 0 18px 28px rgba(0,0,0,.75)',
  scrimOpacity=.42,
}: ZoomBoldTextProps) => {
  const f=useCurrentFrame();
  const {width,height}=useVideoConfig();
  const ease=(start:number,duration:number)=>interpolate(f,[start,start+Math.max(1,duration)],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.4,0,.2,1)});
  const camera=Math.min(ease(zoomStartFrame,zoomFrames),1-ease(returnFrame,returnFrames));
  const extra=Math.max(0,zoom-1)*camera;
  const x=textSide==='right'?-width*extra:0;
  const y=-height*Math.min(Math.max(0,topCrop)*camera,extra);
  const clear=1-ease(clearFrame,clearFrames);
  const firstCue=lines.length?Math.min(...lines.map(l=>l.revealFrame)):clearFrame;
  const scrim=ease(firstCue,revealFrames)*clear;
  return <AbsoluteFill style={{overflow:'hidden'}}>
    <AbsoluteFill style={{transform:`translate(${x}px,${y}px) scale(${1+extra})`,transformOrigin:'0 0'}}>{presenter}</AbsoluteFill>
    <AbsoluteFill style={{opacity:scrim,background:`linear-gradient(${textSide==='left'?'90deg':'270deg'},rgba(0,0,0,${scrimOpacity}) 0%,rgba(0,0,0,${scrimOpacity*.75}) 30%,rgba(0,0,0,0) 64%)`}}/>
    <div style={{position:'absolute',top:height*textTop,left:textSide==='left'?width*.065:undefined,right:textSide==='right'?width*.065:undefined,width:width*textWidth,fontFamily:'Arial Nova, Library Arial, Arial, sans-serif',fontWeight:700,lineHeight:.98,letterSpacing:-4*width/1920,textShadow,pointerEvents:'none'}}>
      {lines.map((line,i)=>{
        const reveal=ease(line.revealFrame,revealFrames);
        return <div key={i} style={{fontSize:line.fontSize*width/1920,color:line.color??'#FFFFFF',opacity:reveal*clear,translate:`0 ${(1-reveal)*22*width/1920}px`,marginBottom:14*width/1920,whiteSpace:'pre-line'}}>{line.text}</div>;
      })}
    </div>
  </AbsoluteFill>;
};
