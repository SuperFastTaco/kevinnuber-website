import {CornerZoomCallout} from './components/CornerZoomCallout';
import {SimulatedBCamera} from './components/SimulatedBCamera';
import {OneToThreeBranch} from './components/OneToThreeBranch';
import React from 'react';
import {AbsoluteFill, Img, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Video} from '@remotion/media';
import {PatternedEditorialSplit} from './components/PatternedEditorialSplit';
import {HandDrawnFlowchart} from './components/HandDrawnFlowchart';
import {CaptionHighlight} from './components/CaptionHighlight';
import {CaptionGlitchRgb} from './components/CaptionGlitchRgb';
import {CameraPunch} from './components/CameraPunch';
import {FullFramePresenterBridge} from './components/FullFramePresenterBridge';
import {PresenterCardMorph} from './components/PresenterCardMorph';
import {EditorialSystemsDiagram} from './components/EditorialSystemsDiagram';
import {DualShowcase} from './components/DualShowcase';
import {PrimaryMediaShowcase} from './components/PrimaryMediaShowcase';
import {MinimalGradientBackground} from './components/MinimalGradientBackground';

const C={navy:'#004472',blue:'#0076BD',light:'#66A4D9',white:'#FFFFFF',gray:'#E6E7E8',ink:'#000000',yellow:'#F3DE89'};
const ease=(f:number,start:number,duration=22)=>interpolate(f,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)});
const phase=(f:number,start=12,end=154)=>Math.min(ease(f,start),1-ease(f,end,20));
const Heading=({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties})=><div style={{fontSize:88,fontWeight:700,lineHeight:1.06,letterSpacing:-3,...style}}>{children}</div>;
const Kicker=({children}:{children:React.ReactNode})=><div style={{fontSize:25,letterSpacing:1,color:C.light,marginBottom:28}}>{children}</div>;
export const Presenter=()=> <Video src={staticFile('presenter.mp4')} muted objectFit='cover' style={{width:'100%',height:'100%'}} />;
const Stage=({children,light=false}:{children?:React.ReactNode;light?:boolean})=><AbsoluteFill style={{background:light?C.gray:C.navy,color:light?C.navy:C.white}}>{children}</AbsoluteFill>;
const Copy=({right=false,title='Make the idea clear.',detail='One visual. One useful message.'}:{right?:boolean;title?:string;detail?:string})=><div style={{position:'absolute',top:305,left:right?1060:120,width:720}}><Kicker>Perspective</Kicker><Heading>{title}</Heading><div style={{fontSize:34,lineHeight:1.4,marginTop:35,color:C.light}}>{detail}</div></div>;

export const TitleScene=()=>{const f=useCurrentFrame(),p=phase(f);return <><Presenter/><AbsoluteFill style={{opacity:p}}><Stage><div style={{position:'absolute',left:150,top:280,transform:`translateY(${(1-p)*45}px)`}}><Kicker>A better conversation</Kicker><Heading style={{fontSize:130}}>Sell the destination.</Heading><Heading style={{fontSize:130,color:C.light}}>Make the outcome real.</Heading><div style={{width:340*p,height:7,background:C.yellow,marginTop:50}}/></div></Stage></AbsoluteFill></>};
export const LowerThirdScene=()=>{const f=useCurrentFrame(),p=phase(f,25,145);return <><Presenter/><div style={{position:'absolute',left:100,bottom:100,opacity:p,transform:`translateX(${(1-p)*-110}px)`,borderLeft:`7px solid ${C.blue}`,background:'rgba(0,68,114,.94)',padding:'26px 45px',width:630}}><div style={{fontSize:55,fontWeight:700}}>Kevin Nuber</div><div style={{fontSize:28,marginTop:10,color:C.gray}}>A better conversation</div></div></>};
export const TrackerScene=()=>{const f=useCurrentFrame(),active=Math.min(2,Math.max(0,Math.floor((f-18)/45)));return <><Presenter/><div style={{position:'absolute',left:250,right:250,bottom:85,display:'flex',gap:8,opacity:phase(f)}}>{['Discover','Connect','Act'].map((t,i)=><div key={t} style={{flex:1,background:i===active?C.blue:C.navy,padding:'26px 32px',borderBottom:`5px solid ${i===active?C.yellow:'transparent'}`,fontSize:34}}><span style={{color:C.light,marginRight:22}}>0{i+1}</span>{t}</div>)}</div></>};
export const SplitScene=()=>{const f=useCurrentFrame(),p=ease(f,12,30);return <Stage><div style={{position:'absolute',left:1920-(1920-1040)*p,top:0,width:880,height:1080}}><Presenter/></div><div style={{opacity:p,transform:`translateX(${(1-p)*-100}px)`}}><Copy title='Lead with the outcome.' detail='Connect the conversation to what matters.'/></div></Stage>};
export const ProcessScene=()=>{const f=useCurrentFrame();return <Stage light><div style={{position:'absolute',left:120,top:130}}><Kicker>A clear sequence</Kicker><Heading>Give every step a purpose.</Heading></div><div style={{position:'absolute',left:120,right:120,top:405,display:'flex',gap:28}}>{['Listen first','Find the connection','Choose the next step'].map((t,i)=>{const p=ease(f,18+i*35);return <div key={t} style={{width:541,height:395,background:C.white,padding:45,boxSizing:'border-box',borderTop:`6px solid ${C.blue}`,opacity:p,transform:`translateY(${(1-p)*60}px)`}}><div style={{fontSize:60,color:C.blue,marginBottom:65}}>0{i+1}</div><div style={{fontSize:45,fontWeight:700,lineHeight:1.12}}>{t}</div></div>})}</div></Stage>};
export const ComparisonScene=()=>{const f=useCurrentFrame();return <Stage><div style={{position:'absolute',left:120,top:140}}><Kicker>A shift in perspective</Kicker><Heading>From features to meaning.</Heading></div>{['The product','The destination'].map((t,i)=><div key={t} style={{position:'absolute',left:120+i*930,top:390,width:750,height:410,padding:55,boxSizing:'border-box',background:i?C.blue:'rgba(255,255,255,.08)',border:'2px solid rgba(255,255,255,.25)',opacity:ease(f,18+i*45),transform:`translateY(${(1-ease(f,18+i*45))*35}px)`}}><div style={{fontSize:27,color:C.light,marginBottom:50}}>{i?'What it makes possible':'What it contains'}</div><Heading style={{fontSize:64}}>{t}</Heading><div style={{fontSize:33,marginTop:24}}>{i?'A clearer next chapter':'Details and specifications'}</div></div>)}<div style={{position:'absolute',left:904,top:542,fontSize:76,color:C.yellow,opacity:ease(f,55)}}>→</div></Stage>};
export const KeyMessageScene=()=>{const f=useCurrentFrame(),p=phase(f);return <Stage><div style={{position:'absolute',left:180,right:180,top:350,opacity:p,transform:`scale(${.97+.03*p})`}}><Kicker>The idea to remember</Kicker><Heading style={{fontSize:140}}>Clarity creates connection.</Heading><div style={{marginTop:45,height:7,width:interpolate(ease(f,32),[0,1],[0,820]),background:C.yellow}}/></div></Stage>};
export const ConceptScene=()=>{const f=useCurrentFrame();return <Stage light><div style={{position:'absolute',left:180,right:180,top:130,textAlign:'center',opacity:ease(f,6)}}><Kicker>The framework</Kicker><Heading>A meaningful conversation</Heading></div><svg viewBox='0 0 1920 1080' style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>{[380,960,1540].map((x,i)=><path key={x} d={`M960 325 L960 420 L${x} 420 L${x} 545`} fill='none' stroke={C.blue} strokeWidth='3' pathLength={1} strokeDasharray={1} strokeDashoffset={1-ease(f,25+i*25)}/>)}</svg>{['Understand','Connect','Guide'].map((t,i)=><div key={t} style={{position:'absolute',left:140+i*580,top:545,width:480,height:250,background:C.white,boxSizing:'border-box',padding:42,opacity:ease(f,40+i*25),borderBottom:`5px solid ${C.blue}`}}><div style={{color:C.blue,fontSize:27,marginBottom:40}}>0{i+1}</div><Heading style={{fontSize:55}}>{t}</Heading></div>)}</Stage>};
// Original vector landscape stands in for supplied B-roll, with deterministic parallax.
const Landscape=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:C.gray,overflow:'hidden'}}><svg viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice' style={{width:'100%',height:'100%'}}><circle cx={1390-f*.45} cy='240' r='95' fill={C.yellow}/><path d={`M-200 850 L420 300 L900 880 L1320 410 L2100 930 V1100 H-200Z`} fill={C.light} transform={`translate(${-f*.2},0)`}/><path d='M-100 1000 L520 610 L1110 1000 L1670 580 L2100 980 V1200 H-100Z' fill={C.blue} transform={`translate(${-f*.5},0)`}/><path d='M-100 1050 Q700 760 2100 1010 V1200 H-100Z' fill={C.navy}/></svg><div style={{position:'absolute',left:130,top:120,color:C.navy}}><Kicker>Original motion illustration</Kicker><Heading>The destination.</Heading></div></AbsoluteFill>};
export const BrollScene=()=>{const f=useCurrentFrame(),p=Math.min(ease(f,25,18),1-ease(f,135,18));return <><Presenter/><div style={{position:'absolute',inset:0,opacity:p}}><Landscape/></div></>};
export const CtaScene=()=>{const f=useCurrentFrame();return <Stage><div style={{position:'absolute',left:180,top:280,width:1450,opacity:phase(f)}}><Kicker>Start the conversation</Kicker><Heading style={{fontSize:110}}>What does the next<br/>chapter look like?</Heading><div style={{display:'inline-block',marginTop:65,padding:'26px 42px',background:C.blue,fontSize:35,opacity:ease(f,55)}}>Explore the possibilities →</div></div></Stage>};
export const TransitionScene=()=>{const f=useCurrentFrame(),p=ease(f,48,30);return <><Presenter/><div style={{position:'absolute',inset:0,transform:`translateX(${(1-p)*1920}px)`,background:C.navy}}><div style={{position:'absolute',left:0,top:0,bottom:0,width:35,background:C.blue}}/><Copy title='A new perspective.' detail='A purposeful transition into the next idea.'/></div></>};
// An original editorial board, visibly labeled as a sample—not a recreated product UI.
const SampleBoard=({variant=0}:{variant?:number})=><AbsoluteFill style={{background:C.white,color:C.navy,padding:'6%',boxSizing:'border-box'}}><div style={{fontSize:24,color:C.blue}}>Sample board · {variant?'Next chapter':'Conversation guide'}</div><div style={{fontSize:56,fontWeight:700,lineHeight:1.05,marginTop:35,letterSpacing:-2}}>{variant?'Make the outcome tangible.':'Start with what matters.'}</div><div style={{marginTop:38,height:'29%',background:C.gray,overflow:'hidden',position:'relative'}}><div style={{position:'absolute',width:'85%',height:'190%',borderRadius:'50%',border:`20px solid ${C.blue}`,left:'18%',top:'25%'}}/></div><div style={{display:'flex',gap:20,marginTop:35}}>{['Discover','Connect','Act'].map((t,i)=><div key={t} style={{flex:1,borderTop:`3px solid ${C.blue}`,paddingTop:18}}><div style={{fontSize:20,color:C.blue}}>0{i+1}</div><div style={{fontSize:26,marginTop:12}}>{t}</div></div>)}</div></AbsoluteFill>;
const Diagram=()=> <EditorialSystemsDiagram background={C.gray} kicker='A system that improves with every conversation' nodes={['Listen','Connect','Refine'].map((title,i)=>({id:String(i),title,detail:['Understand the need','Make the idea useful','Learn and adapt'][i],x:130+i*580,y:390,width:490,height:240,revealFrame:12+i*32,accent:i===1}))} connections={[{id:'a',path:'M620 510 L710 510',revealFrame:40},{id:'b',path:'M1200 510 L1290 510',revealFrame:72},{id:'c',path:'M1535 630 L1535 790 L375 790 L375 630',revealFrame:109,dashed:true}]} />;
const Flow=()=> <Stage><div style={{position:'absolute',left:130,top:120}}><Kicker>Build the relationship</Kicker><Heading>One idea leads to the next.</Heading></div><HandDrawnFlowchart panelColor={C.navy} nodes={['Listen','Connect','Act'].map((title,i)=>({id:String(i),title,number:`0${i+1}`,x:130+i*590,y:420,width:460,height:280,revealFrame:12+i*38}))} connectors={[{from:'0',to:'1',revealFrame:42},{from:'1',to:'2',revealFrame:80}]}/></Stage>;
const words='Make the outcome clear. Give the idea room.'.split(' ').map((text,i)=>({text,startMs:650+i*540,endMs:650+(i+1)*540,breakAfter:i===3}));


const BranchBucket=({color}:{color:string})=><svg viewBox="0 0 130 120" width={110} height={100}><path d="M22 35 L34 105 Q65 115 96 105 L108 35 M22 35 Q65 48 108 35 M22 35 Q65 19 108 35 M38 29 Q38 3 65 3 Q92 3 92 29" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none"/><path d="M36 70 Q65 81 94 70 L89 98 Q65 105 41 98 Z" fill={color} opacity={.12}/></svg>;
export const BranchDemo=()=> <OneToThreeBranch title="Three ways your money is taxed" sourceLabel="Your money" sourceMedia={<Img src={staticFile('reference/roth-money.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/>} sourceRevealFrame={8} branches={[
 {id:'taxable',label:'Taxable',revealFrame:40,icon:color=><BranchBucket color={color}/>},
 {id:'deferred',label:'Tax-deferred',revealFrame:75,icon:color=><BranchBucket color={color}/>},
 {id:'free',label:'Tax-free',revealFrame:110,icon:color=><BranchBucket color={color}/>,highlight:true},
]} presenter={<Presenter/>}/>;


export const CornerZoomDemo=({corner}:{corner:'top-left'|'top-right'})=> <CornerZoomCallout presenter={<Presenter/>} corner={corner} content={corner==='top-right'?
 <div style={{background:'rgba(255,255,255,.97)',color:C.navy,borderRadius:22,overflow:'hidden',boxShadow:'0 16px 50px rgba(0,0,0,.12)'}}>
  <div style={{background:C.navy,color:C.white,padding:'22px 34px',fontSize:27}}>Your next chapter</div>
  <div style={{padding:'32px 34px 38px'}}>
   <svg viewBox="0 0 560 65" style={{width:'100%',height:65,display:'block',marginBottom:28}}><circle cx="20" cy="32" r="10" fill={C.blue}/><path d="M40 32 H480" stroke={C.blue} strokeWidth="3" strokeDasharray="8 8"/><path d="M510 8 C480 8 480 40 510 59 C540 40 540 8 510 8 Z" stroke={C.blue} strokeWidth="3" fill="none"/><circle cx="510" cy="26" r="6" fill={C.blue}/></svg>
   <div style={{fontSize:27,color:C.blue,marginBottom:15}}>Destination</div>
   <div style={{fontSize:67,fontWeight:700,lineHeight:1.05,letterSpacing:-2}}>More time.<br/>More freedom.</div>
  </div>
 </div>:
 <div style={{background:'rgba(255,255,255,.96)',color:C.navy,borderRadius:22,padding:'38px 40px 42px',boxShadow:'0 16px 50px rgba(0,0,0,.12)'}}>
  <div style={{fontSize:26,color:C.blue,marginBottom:22}}>The idea to remember</div>
  <div style={{fontSize:76,fontWeight:700,lineHeight:1.06,letterSpacing:-2}}>Lead with<br/>the outcome.</div>
  <div style={{width:105,height:5,background:C.blue,marginTop:30}}/>
 </div>
}/>;

export const Demo=({id}:{id:string})=>{
 let content:React.ReactNode;
 switch(id){
 case 'corner-zoom-right':content=<CornerZoomDemo corner='top-right'/>;break;
 case 'corner-zoom-left':content=<CornerZoomDemo corner='top-left'/>;break;
 case 'simulated-b-camera':content=<SimulatedBCamera presenter={<Video src={staticFile('reference/bcamera-front.mp4')} muted objectFit='cover' style={{width:'100%',height:'100%'}}/>} cuts={[{id:'left-angle',from:32,durationInFrames:103,src:staticFile('reference/bcamera-generated.mp4'),trimBefore:32},{id:'right-angle',from:135,durationInFrames:30,src:staticFile('reference/bcamera-generated.mp4'),trimBefore:135}]}/>;break;
 case 'pip-one-to-three':content=<BranchDemo/>;break;
 case 'opening-title':content=<TitleScene/>;break;
 case 'presenter-lower-third':content=<LowerThirdScene/>;break;
 case 'stage-tracker':content=<TrackerScene/>;break;
 case 'clean-split':content=<SplitScene/>;break;
 case 'editorial-split':content=<PatternedEditorialSplit kicker='Three useful moves' headline='Make the conversation count.' video={<Presenter/>} items={['Discover','Connect','Act'].map((title,i)=>({number:`0${i+1}`,title,detail:['Start with the need.','Make the outcome real.','Choose one next step.'][i],revealFrame:25+i*38}))}/>;break;
 case 'process-cards':content=<ProcessScene/>;break;
 case 'sketch-flow':content=<Flow/>;break;
 case 'highlight-captions':content=<><Presenter/><CaptionHighlight words={words} accentColor={C.blue} accentShadowColor='rgba(0,118,189,.3)' bottom={95}/></>;break;
 case 'glitch-captions':content=<><Presenter/><CaptionGlitchRgb words={words} bottom={95}/></>;break;
 case 'comparison':content=<ComparisonScene/>;break;
 case 'key-message':content=<KeyMessageScene/>;break;
 case 'concept-scene':content=<ConceptScene/>;break;
 case 'broll-insert':content=<BrollScene/>;break;
 case 'closing-cta':content=<CtaScene/>;break;
 case 'panel-transition':content=<TransitionScene/>;break;
 case 'presenter-side-swap':content=<PresenterCardMorph video={<Presenter/>} preset='sideSwapBridge' startFrame={65} durationInFrames={32} fromScene={<Stage><Copy title='Start with the idea.'/></Stage>} toScene={<Stage><Copy right title='Then make it useful.'/></Stage>}/>;break;
 case 'corner-pip':case 'full-to-split':content=<FullFramePresenterBridge video={<Presenter/>} graphic={<Stage><div style={{position:'absolute',left:id==='corner-pip'?720:120,top:300,width:850}}><Kicker>Make room for the idea</Kicker><Heading>{id==='corner-pip'?'Let the graphic lead.':'Keep the conversation personal.'}</Heading><div style={{fontSize:34,color:C.light,marginTop:38}}>The presenter stays connected.</div></div></Stage>} sceneDurationInFrames={180} enterFrames={38} exitFrames={30} target={id==='corner-pip'?{x:85,y:690,width:510,height:287,borderRadius:22}:{x:1100,y:110,width:730,height:860,borderRadius:24}}/>;break;
 case 'pip-to-split':content=<PresenterCardMorph video={<Presenter/>} preset='pipToSplit' startFrame={50} durationInFrames={38} fromScene={<Stage><Copy right title='Let the idea lead.'/></Stage>} toScene={<Stage><Copy title='Bring the speaker back.'/></Stage>}/>;break;
 case 'systems-diagram':content=<Diagram/>;break;
 case 'dual-showcase':content=<DualShowcase presenter={<Presenter/>} backdropDim={0} left={{content:<SampleBoard/>,revealFrame:20}} right={{content:<SampleBoard variant={1}/>,revealFrame:65}}/>;break;
 case 'primary-media':case 'media-only':case 'circle-pip':content=<PrimaryMediaShowcase media={<SampleBoard/>} presenter={id==='media-only'?undefined:<Presenter/>} presenterShape={id==='circle-pip'?'circle':'rounded'} presenterPosition='bottom-left' presenterRect={id==='primary-media'?{width:420,height:237,borderRadius:20}:undefined} mediaRevealFrame={8} presenterRevealFrame={38}/>;break;
 case 'gradient-full':case 'gradient-card':content=<MinimalGradientBackground scheme='dark' barMode={id==='gradient-card'?'card':'fullBleed'} stageDarkColor={C.gray} baseDarkColor={C.navy} animationIn={false} animationOut={false}><div style={{position:'absolute',left:'16%',right:'16%',top:'36%'}}><Kicker>A quiet backdrop</Kicker><Heading style={{fontSize:100}}>Space for the idea.</Heading></div></MinimalGradientBackground>;break;
 case 'camera-punch':content=<CameraPunch cues={[{startFrame:35,endFrame:145,scale:1.12,transitionFrames:22,focusX:49,focusY:32}]}><Presenter/></CameraPunch>;break;
 default:throw new Error(`Unknown demo: ${id}`);
 }
 return <AbsoluteFill style={{background:C.navy,color:C.white,fontFamily:'Library Arial, Arial, sans-serif',overflow:'hidden'}}><style>{`@font-face{font-family:'Library Arial';src:url('${staticFile('fonts/Arial-Regular.ttf')}')}@font-face{font-family:'Library Arial';src:url('${staticFile('fonts/Arial-Bold.ttf')}');font-weight:700}`}</style>{content}</AbsoluteFill>;
};
