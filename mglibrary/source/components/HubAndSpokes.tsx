import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

export type SpokeItem = {
  id: string;
  /** Identification only in icon mode; enable showLabels to display it. */
  label: string;
  icon: React.ReactNode;
  revealFrame: number;
};
type Props = {
  centerContent: React.ReactNode;
  items: SpokeItem[];
  centerLabel?: string;
  showLabels?: boolean;
  centerRevealFrame?: number;
  lineFrames?: number;
  nodeFrames?: number;
  glowFrame?: number;
  fadeOutFrame?: number;
  fadeOutFrames?: number;
  radius?: number;
  startAngle?: number;
  accent?: string;
  hubColor?: string;
  tileColor?: string;
  background?: string;
};

/** 1920×1080 reference: 260px hub, six 150px tiles at 60-degree intervals.
 * All icons/content are supplied by the caller; no app logos or agent metaphor
 * are built in. Use 3–6 spokes and independently cue reveals to the speech.
 */
export const HubAndSpokes = ({
  centerContent, items, centerLabel, showLabels=false,
  centerRevealFrame=4, lineFrames=17, nodeFrames=16,
  glowFrame=124, fadeOutFrame=162, fadeOutFrames=17,
  radius=340, startAngle=-90, accent='#0076BD', hubColor='#004472',
  tileColor='#FFFFFF', background='#E6E7E8',
}: Props) => {
  const frame=useCurrentFrame();
  const progress=(start:number,duration:number)=>interpolate(frame,
    [start,start+Math.max(1,duration)],[0,1],{
      extrapolateLeft:'clamp',extrapolateRight:'clamp',
      easing:Easing.bezier(.16,1,.3,1),
    });
  const center=progress(centerRevealFrame,20);
  const fade=1-interpolate(frame,[fadeOutFrame,fadeOutFrame+Math.max(1,fadeOutFrames)],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const glow=progress(glowFrame,24);
  const nodes=items.map((item,i)=>{
    const angle=(startAngle+i*360/items.length)*Math.PI/180;
    const dx=radius*Math.cos(angle),dy=radius*Math.sin(angle);
    const edge=Math.min(75/Math.max(Math.abs(dx),.001),75/Math.max(Math.abs(dy),.001));
    return {...item,x:960+dx,y:540+dy,
      sx:960+dx*130/radius,sy:540+dy*130/radius,
      ex:960+dx*(1-edge),ey:540+dy*(1-edge)};
  });
  return <AbsoluteFill style={{background,fontFamily:'Arial Nova, Arial, sans-serif'}}>
    <AbsoluteFill style={{opacity:fade}}>
      <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        {nodes.map(n=><path key={n.id} d={`M${n.sx} ${n.sy} L${n.ex} ${n.ey}`} fill="none" stroke={accent} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress(n.revealFrame,lineFrames)} opacity={frame>n.revealFrame?1:0}/>)}
        <circle cx={960} cy={540} r={141+glow*12} fill="none" stroke={accent} strokeWidth={2} opacity={glow*.2}/>
      </svg>
      <div style={{position:'absolute',left:830,top:410,width:260,height:260,borderRadius:'50%',background:hubColor,color:'#FFFFFF',border:'2px solid #FFFFFF',boxSizing:'border-box',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',opacity:center,scale:.9+.1*center,boxShadow:`0 0 ${12+glow*48}px ${glow*12}px rgba(0,118,189,${.08+glow*.24})`}}>
        {centerContent}
        {centerLabel&&<div style={{fontSize:28,lineHeight:1.15,marginTop:14,maxWidth:190}}>{centerLabel}</div>}
      </div>
      {nodes.map(n=>{
        const enter=n.revealFrame+lineFrames-5;
        const p=progress(enter,nodeFrames);
        const pop=interpolate(frame,[enter,enter+nodeFrames*.7,enter+nodeFrames],[.82,1.035,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
        return <div key={n.id} style={{position:'absolute',left:n.x-75,top:n.y-75,width:150,height:150,borderRadius:28,background:tileColor,border:'2px solid rgba(0,68,114,.12)',color:accent,boxShadow:'0 8px 24px rgba(0,68,114,.06)',display:'flex',alignItems:'center',justifyContent:'center',boxSizing:'border-box',opacity:p,scale:pop}}>
          {n.icon}
          {showLabels&&<div style={{position:'absolute',top:162,left:-70,width:290,color:hubColor,textAlign:'center',fontSize:28,fontWeight:700}}>{n.label}</div>}
        </div>;
      })}
    </AbsoluteFill>
  </AbsoluteFill>;
};
