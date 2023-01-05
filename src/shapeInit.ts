import { CreateBox, CreatePolyhedron, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { scene } from "./scene";

export type type_whichShape = "sphere" | "box" | "triangle" | "diamond" | "stone" | "ruby";

//todo add as much shapes as I want
//Base for the duplicate shapeM shapeL
// import a type for whichShape  Math.PI
export const shapeInit = (whichShape: type_whichShape) => {
  let shapeCreateInit: Mesh;
  //init shape and size them on my visual appreciation of volume
  switch (whichShape) {
    case "sphere":
      shapeCreateInit = CreateSphere("shapeMInit", { segments: 16, updatable: true }, scene);
      break;
    case "box":
      shapeCreateInit = CreateBox("shapeMInit", { size: 0.9, updatable: true }, scene);
      break;
    case "triangle":
      shapeCreateInit = CreatePolyhedron("shapeMInit", { type: 0, size: 0.47, updatable: true });
      shapeCreateInit.rotation.x = -Math.PI * 0.5;
      break;
    case "diamond":
      shapeCreateInit = CreatePolyhedron("shapeMInit", { type: 1, size: 0.48, updatable: true });
      break;
    case "stone":
      shapeCreateInit = CreatePolyhedron("shapeMInit", { type: 2, size: 0.52, updatable: true });
      shapeCreateInit.addRotation(-Math.PI * 0.5, -Math.PI * 0, Math.PI * 0);
      shapeCreateInit.addRotation(0, Math.PI * 0.04, Math.PI * 0);
      break;
    case "ruby":
      shapeCreateInit = CreatePolyhedron("shapeMInit", { type: 12, size: 0.54, updatable: true });
      shapeCreateInit.addRotation(0, 0, -Math.PI * 0.11);
      break;
  }

  return shapeCreateInit;
};
