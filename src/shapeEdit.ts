//MODE
//mode update

import { Mesh, SolidParticle, Vector3 } from "@babylonjs/core";
import { generateScaleFunction } from "./Helpers/math";
import { distanceFromShapeMPerimeter, radiusPlayArea, shapeM_value } from "./variables";

export let positionShape: Function;

export function ModeSettingUp(whichMode: "packedOnBorder" | "scatteredInside") {
  // Function to position shapePs and shapeL
  // Scale to a range, return another function
  const translateVectorFromCenter_Function = generateScaleFunction(
    0,
    radiusPlayArea,
    shapeM_value + distanceFromShapeMPerimeter,
    radiusPlayArea
  );

  if (whichMode === "packedOnBorder") {
    positionShape = function (MeshParticle: SolidParticle | Mesh, direction: Vector3) {
      // position all shape at border
      MeshParticle.position = direction.normalize().scale(radiusPlayArea);
    };
  }

  if (whichMode === "scatteredInside") {
    positionShape = function (MeshParticle: SolidParticle | Mesh, direction: Vector3) {
      // vector to 1 unit
      const directionNormalized = direction.normalize();
      // initiate vector position without space at the center
      const randomPos = Math.random() * radiusPlayArea;
      // space from the center shape diameter
      const Pos = translateVectorFromCenter_Function(randomPos);
      // apply pos to Vector3 particle
      MeshParticle.position = directionNormalized.scale(Pos);
    };
  }
}

// Check overlapping of two vectors for each shapeLs, return true if safe
export const checkCollision = (againstMeshArray: Mesh[], thisMesh: Mesh | SolidParticle) =>
  againstMeshArray.every(
    (shape) => Vector3.Distance(shape.position, thisMesh.position) >= shape.getBoundingInfo().diagonalLength
  );
