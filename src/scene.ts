import { Color3, GlowLayer } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { canvas } from "./domItems";
import { cameraOffSetFromRadius, radiusPlayArea } from "./variables";

export const engine = new Engine(canvas, true, { stencil: true });
export const scene = makeScene();
export let camera: ArcRotateCamera;
// export let light: HemisphericLight;
export let light;

function makeScene(): Scene {
  const scene = new Scene(engine);
  createCamera(scene);
  light = new HemisphericLight("light", new Vector3(0, radiusPlayArea * 1.5, 0), scene);
  light.groundColor = Color3.FromHexString("#acacac");
  return scene;
}

function createCamera(scene: Scene): void {
  
  const radius: number = radiusPlayArea + cameraOffSetFromRadius; //camera position from de center
  const target: Vector3 = new Vector3(0, 0, 0);
  var arcCamera = new ArcRotateCamera("Camera", Math.PI * 0.875, Math.PI * 0.3, radius, target, scene);
//   scene.onBeforeRenderObservable.add(() => { //Offset to see the UI at the top of the screen
//     camera.targetScreenOffset.y = -0.2*camera.radius;
// })
  arcCamera.attachControl(canvas);
  arcCamera.lowerBetaLimit = -Math.PI * 2;

  arcCamera.inertia = 0.95; // default = 0.9, continue to rotate after rotating
  arcCamera.fov = 0.8; //default = 0.8, min = 0.1, max = 2, the more the more perspective
  arcCamera.fovMode = 1; //default = 0.8, min = 0.1, max = 2, the more the more perspective
  // arcCamera.orthoLeft = 0; //default = 0.8, min = 0.1, max = 2, the more the more perspective
  arcCamera.wheelPrecision = 10;

  // arcCamera.panningSensibility = 0;
  // arcCamera.allowUpsideDown = true; //don't work
  // arcCamera.angularSensibilityX = 1000 //speed rotation
  // arcCamera.angularSensibilityY = 1000

  camera = arcCamera;
}

//todo lighting that show more details
