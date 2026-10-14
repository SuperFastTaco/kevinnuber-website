import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type BranchDestination = {
  id: string;
  label: string;
  /** First visible frame, relative to this component's Sequence. */
  revealFrame: number;
  detail?: string;
  /** Receives the current ink color, including when this card is highlighted. */
  icon?: (color: string) => ReactNode;
  highlight?: boolean;
};
export type BranchRect = {x: number; y: number; width: number; height: number};
export type OneToThreeBranchProps = {
  title: string;
  sourceLabel: string;
  sourceMedia?: ReactNode;
  sourceRevealFrame?: number;
  branches: [BranchDestination, BranchDestination, BranchDestination];
  presenter?: ReactNode;
  presenterRect?: BranchRect;
  presenterStyle?: CSSProperties;
  sourceRect?: BranchRect;
  destinationRect?: BranchRect;
  destinationGap?: number;
  revealFrames?: number;
  drawFrames?: number;
  highlightMode?: 'marked' | 'latest' | 'none';
  background?: string;
  cardColor?: string;
  inkColor?: string;
  accentColor?: string;
  highlightColor?: string;
  highlightTextColor?: string;
  borderColor?: string;
  fontFamily?: string;
};

/**
 * One idea branches into three, with optional uninterrupted presenter PiP.
 * Generalized from the Roth Conversion project's G04 / MoneyBuckets scene.
 * All geometry is on a 1920×1080 design canvas, fitted without distortion.
 * Timing is component-local: subtract the enclosing Sequence start exactly once.
 * This is a creative starting point; adapt it to the content and face-safe space.
 */
export const OneToThreeBranch = ({
  title, sourceLabel, sourceMedia, branches, presenter,
  sourceRevealFrame = 8,
  presenterRect = {x:1370, y:733, width:450, height:253},
  presenterStyle,
  sourceRect = {x:110, y:320, width:390, height:380},
  destinationRect = {x:850, y:225, width:465, height:160},
  destinationGap = 50,
  revealFrames = 14,
  drawFrames = 16,
  highlightMode = 'marked',
  background = '#FFFFFF', cardColor = '#FFFFFF', inkColor = '#004472',
  accentColor = '#0076BD', highlightColor = '#004472',
  highlightTextColor = '#FFFFFF', borderColor = '#E6E7E8',
  fontFamily = '"Arial Nova", Arial, Helvetica, sans-serif',
}: OneToThreeBranchProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const scale = Math.min(width / 1920, height / 1080);
  // Mount gated groups only at their cue: no dots, arrowheads or empty cards early.
  const progress = (start: number, duration: number) => frame < start ? 0 : interpolate(
    frame, [start - 1, start + Math.max(1, duration)], [0, 1],
    {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.out(Easing.cubic)},
  );
  const reveal = (start:number):CSSProperties => ({
    opacity:progress(start,revealFrames),
    transform:`translateY(${(1-progress(start,revealFrames))*18}px)`,
  });
  const latest = branches.reduce((best, branch, index) =>
    frame >= branch.revealFrame && (best < 0 || branch.revealFrame >= branches[best].revealFrame) ? index : best, -1);
  const originX = sourceRect.x + sourceRect.width + 25;
  const originY = sourceRect.y + sourceRect.height / 2;
  return <AbsoluteFill style={{background, overflow:'hidden'}}>
    <div style={{position:'absolute',width:1920,height:1080,left:(width-1920*scale)/2,top:(height-1080*scale)/2,transform:`scale(${scale})`,transformOrigin:'top left',fontFamily,color:inkColor}}>
      <AbsoluteFill style={{background:`radial-gradient(ellipse at 68% 10%, ${accentColor}12, transparent 65%)`}}/>
      <AbsoluteFill style={{opacity:.16,backgroundImage:`radial-gradient(${accentColor} 1px, transparent 1px)`,backgroundSize:'32px 32px'}}/>
      <div style={{position:'absolute',left:100,top:85,right:100,fontSize:48,fontWeight:700,letterSpacing:-1.3,lineHeight:1.15}}>{title}</div>
      {frame >= sourceRevealFrame && <div data-branch-source style={{position:'absolute',left:sourceRect.x,top:sourceRect.y,width:sourceRect.width,height:sourceRect.height,background:cardColor,border:`2px solid ${borderColor}`,boxShadow:'0 18px 44px rgba(0,68,114,.07)',borderRadius:22,boxSizing:'border-box',...reveal(sourceRevealFrame)}}>
        {sourceMedia && <div style={{position:'absolute',inset:'18px 20px 92px',display:'flex',alignItems:'center',justifyContent:'center'}}>{sourceMedia}</div>}
        <div style={{position:'absolute',left:22,right:22,...(sourceMedia?{bottom:30}:{top:'50%',transform:'translateY(-50%)'}),textAlign:'center',fontSize:34,fontWeight:700,lineHeight:1.15}}>{sourceLabel}</div>
      </div>}
      <svg width={1920} height={1080} viewBox='0 0 1920 1080' style={{position:'absolute',inset:0}} aria-hidden='true'>
        {branches.map((branch,index)=>{
          if(frame < branch.revealFrame)return null;
          const endX=destinationRect.x-45;
          const endY=destinationRect.y+index*(destinationRect.height+destinationGap)+destinationRect.height/2;
          return <g key={branch.id} data-branch-connector={branch.id}>
            <path d={`M ${originX} ${originY} C ${originX+135} ${originY} ${endX-105} ${endY} ${endX} ${endY}`} pathLength={1} fill='none' stroke={accentColor} strokeWidth={5} strokeDasharray={1} strokeDashoffset={1-progress(branch.revealFrame,drawFrames)} strokeLinecap='round'/>
            {frame >= branch.revealFrame+drawFrames/2 && <path d={`M ${endX-18} ${endY-10} L ${endX} ${endY} L ${endX-18} ${endY+10}`} fill='none' stroke={accentColor} strokeWidth={4} opacity={progress(branch.revealFrame+drawFrames/2,drawFrames/2)}/>}
          </g>;
        })}
      </svg>
      {branches.map((branch,index)=>{
        if(frame < branch.revealFrame)return null;
        const active=highlightMode==='latest'?index===latest:highlightMode==='marked'&&branch.highlight;
        const ink=active?highlightTextColor:inkColor;
        return <div key={branch.id} data-branch-card={branch.id} style={{position:'absolute',left:destinationRect.x,top:destinationRect.y+index*(destinationRect.height+destinationGap),width:destinationRect.width,height:destinationRect.height,boxSizing:'border-box',display:'flex',alignItems:'center',gap:27,padding:'20px 30px',background:active?highlightColor:cardColor,color:ink,border:`2px solid ${active?highlightColor:borderColor}`,borderRadius:18,...reveal(branch.revealFrame)}}>
          {branch.icon && <div style={{flex:'0 0 110px',display:'flex',justifyContent:'center'}}>{branch.icon(active?highlightTextColor:accentColor)}</div>}
          <div style={{minWidth:0}}><div style={{fontSize:36,fontWeight:700,lineHeight:1.1}}>{branch.label}</div>{branch.detail && <div style={{fontSize:23,lineHeight:1.2,marginTop:12}}>{branch.detail}</div>}</div>
        </div>;
      })}
      {presenter && <div style={{position:'absolute',left:presenterRect.x,top:presenterRect.y,width:presenterRect.width,height:presenterRect.height,overflow:'hidden',borderRadius:18,border:`1px solid ${borderColor}`,boxShadow:'0 18px 44px rgba(0,68,114,.12)',...presenterStyle}}>{presenter}</div>}
    </div>
  </AbsoluteFill>;
};
