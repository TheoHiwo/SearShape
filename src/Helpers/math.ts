import { Mesh, SolidParticle, Vector3 } from "@babylonjs/core";
import { distanceFromShapeMPerimeter, radiusPlayArea, shapeM_value } from "../variables";

// Function helper to scale a number between a range, to another number with another range,
//  return a function to set the initial number to scale.
export function generateScaleFunction(prevMin: number, prevMax: number, newMin: number, newMax: number) {
  let offset = newMin - prevMin,
    scale = (newMax - newMin) / (prevMax - prevMin);
  return function (x: number) {
    return offset + scale * x;
  };
}
/* var fn = generateScaleFunction(0, 100, 20, 60);
fn(  0); // 20
fn( 25); // 30
fn( 50); // 40
fn( 75); // 50
fn(100); // 60
fn(1); // 20.4 */



