import {useId} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type TexturedUnderlineProps = {
  lead?: string;
  emphasis: string;
  fontSize?: number;
  centerY?: number;
  textRevealFrame?: number;
  textRevealFrames?: number;
  underlineFrame?: number;
  underlineFrames?: number;
  exitFrame?: number;
  exitFrames?: number;
  background?: string;
  accent?: string;
  glowColor?: string;
  gridOpacity?: number;
  grainOpacity?: number;
  glowOpacity?: number;
};

/** An editorial emphasis card: quiet texture, weighted type, hand-drawn sweep.
 * Cue it to a short spoken point; keep full phrases readable and comfortably
 * inside the frame. Fixed noise seed and analytic drift keep renders repeatable.
 */
export const TexturedUnderline = ({
  lead='Make it', emphasis, fontSize=140, centerY=.49,
  textRevealFrame=12, textRevealFrames=22, underlineFrame=44, underlineFrames=30,
  exitFrame=150, exitFrames=22, background='#004472', accent='#66A4D9',
  glowColor='#0076BD', gridOpacity=.1, grainOpacity=.06, glowOpacity=.4,
}: TexturedUnderlineProps) => {
  const f=useCurrentFrame();
  const {width,height,fps}=useVideoConfig();
  const scale=width/1920;
  const id=useId().replace(/:/g,'');
  const progress=(start:number,duration:number)=>interpolate(f,[start,start+Math.max(1,duration)],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)});
  const enter=progress(textRevealFrame,textRevealFrames);
  const out=1-progress(exitFrame,exitFrames);
  const draw=progress(underlineFrame,underlineFrames);
  const drift=Math.sin(f/fps*.35)*18;
  return <AbsoluteFill style={{background,overflow:'hidden',fontFamily:'Arial Nova, Library Arial, Arial, sans-serif'}}>
    <AbsoluteFill style={{opacity:out}}>
      <AbsoluteFill style={{opacity:glowOpacity,background:`radial-gradient(ellipse 41% 31% at ${57+drift*.08}% 53%, ${glowColor} 0%, transparent 100%), radial-gradient(ellipse 40% 65% at 100% 100%, ${glowColor} 0%, transparent 100%)`}}/>
      <AbsoluteFill style={{opacity:gridOpacity,backgroundImage:'linear-gradient(#FFFFFF 1.5px,transparent 1.5px),linear-gradient(90deg,#FFFFFF 1.5px,transparent 1.5px)',backgroundSize:`${36*scale}px ${36*scale}px`}}/>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:grainOpacity}}>
        <defs><filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" seed="12" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>
        <rect width="1920" height="1080" filter={`url(#${id}-grain)`}/>
      </svg>
      <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        {Array.from({length:38},(_,i)=><circle key={i} cx={(i*421+83)%1920} cy={((i*263+51)%1080)+Math.sin(f/fps*.3+i)*4} r={i%5===0?2.6:1.1} fill="#FFFFFF" opacity={i%5===0?.12:.065}/>)}
      </svg>
      <AbsoluteFill style={{background:'radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,.19) 100%)'}}/>
      <div style={{position:'absolute',left:width*.085,right:width*.085,top:height*centerY,display:'flex',justifyContent:'center',alignItems:'baseline',gap:fontSize*.24*scale,fontSize:fontSize*scale,fontWeight:700,lineHeight:1.06,letterSpacing:-fontSize*.045*scale,color:'#FFFFFF',textShadow:'0 3px 8px rgba(0,0,0,.18)',opacity:enter,transform:`translateY(calc(-50% + ${(1-enter)*22*scale}px)) scale(${.985+.015*enter})`,whiteSpace:'nowrap'}}>
        {lead&&<span>{lead}</span>}
        <span style={{position:'relative',color:accent}}>
          {emphasis}
          <svg viewBox="0 0 1000 70" preserveAspectRatio="none" style={{position:'absolute',left:0,top:'100%',width:'100%',height:46*scale,overflow:'visible'}}>
            <defs><clipPath id={`${id}-sweep`}><rect width={1000*draw} height="70"/></clipPath></defs>
            <path d="M0 46 Q500 -2 1000 46 Q500 16 0 46Z" fill={accent} clipPath={`url(#${id}-sweep)`}/>
          </svg>
        </span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
