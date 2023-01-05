import { Color3, Mesh, StandardMaterial } from "@babylonjs/core";
import { hl, shapeMColor } from "./env";
import { scene } from "./scene";
import { shapeInit } from "./shapeInit";
import { randShapeMLP, scaleShapeM, whichShapeML } from "./variables";

export let shapeM: Mesh;
export function shapeMRender() {
  randShapeMLP();
  // call in index
  shapeM = shapeInit(whichShapeML);
  shapeM.scaling = scaleShapeM;
  

  let shapeMMat = new StandardMaterial("shapeMMat", scene);
  shapeM.material = shapeMMat;
  shapeMMat.diffuseColor = shapeMColor;
  shapeMMat.specularColor = new Color3(0.7, 0.7, 0.7);

  hl.addMesh(shapeM, shapeMColor);
}
