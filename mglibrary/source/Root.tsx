import {Composition} from 'remotion';
import {Demo} from './Demos';
import catalog from './catalog.json';
export const RemotionRoot=()=> <>{catalog.map(entry=><Composition key={entry.id} id={entry.id} component={Demo} defaultProps={{id:entry.id}} durationInFrames={180} fps={30} width={1920} height={1080}/>)}</>;
