import { Scalar, Vector3 } from "@babylonjs/core";
import { Chsl } from "./Helpers/hsluv";
import { type_whichShape } from "./shapeInit";

//STATE
//todo play screen
//in game
//loading

// MODE
// Mode options:
/* "packedOnBorder" | "scatteredInside" */
export let whichMode: "packedOnBorder" | "scatteredInside" = "scatteredInside";

// list all shapes
const allShapesArray: type_whichShape[] = ["sphere", "box", "triangle", "diamond", "stone", "ruby"];
// list shapes without shapeML
let restShapesArray: type_whichShape[];

// random shape used for shapeML
export let whichShapeML: type_whichShape;
// random shape used for shapeP
export let whichShapeP: type_whichShape;

// set the random shape to shapeMLP
export const randShapeMLP = () => {
  // take a random shape for shapeML
  let IndexRandomShapeML = Math.floor(Math.random() * allShapesArray.length);
  whichShapeML = allShapesArray[IndexRandomShapeML];
  // take a random shape for shapeP
  restShapesArray = [...allShapesArray];
  restShapesArray.splice(IndexRandomShapeML, 1);
  whichShapeP = restShapesArray[Math.floor(Math.random() * restShapesArray.length)];
};

// whichShapeML: type_whichShape = "ruby"; //! shapeML
// export let whichShapeP: type_whichShape = "sphere"; //! shapeP

//! shape qui se resemble add to difficulty

//todo difficulty variable / variablesD
//todo let difficulty = sliderGUI;
//todo scale all related difficulty variables to the above variable
//todo a variablesD could be at 0% if another is set to 100%
//todo let considering difficulty between 0 and 1000 as point,
//for each variablesD

//todo difficulty variable increase by one for each games, store in playerLvL.
//todo difficulty add some pole or other shapes to block the vision and force the player to rotate the scene

// todo example of good balance of difficulty:
// numShapeP = 100
// radius = 30

//POINTS
export let points = 0;
export const setPoint = (point: number) => {
  points = point;
};
export const updatePoint = (point: number) => {
  points += point;
};

// SHAPES VARIABLES
export let numShapeP = 40;
export let numShapeL = 10;
//todo WHY the second round start at 0, then render the correct number when the first shape is find

// center shape diameter
export let shapeM_value = 3;
export let scaleShapeM = new Vector3(shapeM_value, shapeM_value, shapeM_value);

// scale shapeP and shapeL
export const scaleShapePL = () => {
  const scaleUnit = Scalar.RandomRange(0.7, 1.5);
  return new Vector3(scaleUnit, scaleUnit, scaleUnit);
};

// COLORS VARIABLES
//todo alternate between dark and light
export let envColor = new Chsl(220, 100, 80);

// SCENE VARIABLES
// position the limit of shape's max position
export let radiusPlayArea = 30; //also use for camera starting position
export let cameraOffSetFromRadius = 5; //camera offset position from radiusPlayArea

// distance between shapePs generation and shapeM's perimeter
export let distanceFromShapeMPerimeter = shapeM_value / 2;
