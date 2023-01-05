// chsl4(Math.random() * 360, 10, 90);

import { Color3, Color4, HighlightLayer } from "@babylonjs/core";
// import { Chsl, chsl3, chsl4, hueDegree } from "./Helpers/hsluv";
import { scene } from "./scene";
import { scaleShapePL } from "./variables";
export let isDarkTheme = false; // = !BoolDarkLight goToPlayScreen
export let shapeMColor: Color3;
export let shapePColor: Color3;
export let hl: HighlightLayer;
/* combination: 
    monochrome = 0,
    analogous = 30,
    tetradic = 90,
    triadic = 120,
    complementary = 180
*/

const colorsThemes = {
  // shapeM, shapePL, background
  wood: ["#DFC0AC", "#341819", ],

}
let colorsPalette = {
  
}



export const newSceneColors = () => {
  isDarkTheme = !isDarkTheme; // || false
  //todo array of wood theme variation of 3 colors each
  environmentColors();
  glowLayer();
};

// impact background greatly
export const environmentColors = () => {
  shapeMColor = Color3.FromHexString(isDarkTheme ? "#DFC0AC" : "#341819");
  shapePColor = Color3.FromHexString("#BB7349");
  scene.clearColor = Color4.FromHexString(isDarkTheme ? "#341819" : "#DFC0AC");
};

// impact shape greatly
export const glowLayer = () => {
  // Add the highlight layer.
  hl = new HighlightLayer("hl1", scene);
  hl.innerGlow = false;
};

export const colorShapePL = () => {
//lerp with low saturation and luminance hex color
  return Color3.Lerp(
    Color3.Lerp(shapePColor, Color3.FromHexString("#858585"), Math.random() / 2.5),
     Color3.FromHexString("#56321d"), Math.random() / 2.5)
}
