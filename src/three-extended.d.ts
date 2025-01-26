declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader } from 'three';
    import { LoadingManager, Group } from 'three';
  
    export class GLTFLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (gltf: GLTF) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      parse(
        data: ArrayBuffer | string,
        path: string,
        onLoad: (gltf: GLTF) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
    }
  
    export interface GLTF {
      animations: unknown[];
      scene: Group;
      scenes: Group[];
      cameras: unknown[];
      asset: object;
    }
  }
  
declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}
  