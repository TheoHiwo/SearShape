import { newSceneColors } from "./env";
import { engine, scene } from "./scene";
import { shapeMRender } from "./shapeM";
import { ModeSettingUp } from "./shapeEdit";
import { whichMode } from "./variables";
import { GUI } from "./GUI/gui";
import { doAnimations } from "./animation";

// Setting-up
ModeSettingUp(whichMode);

//create materials and colors
newSceneColors();

// Main shape.
shapeMRender();

//Show Play GUI
GUI();

doAnimations();

// Render every frame
engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
