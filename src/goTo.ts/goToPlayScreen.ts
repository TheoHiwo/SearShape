// import { StandardMaterial } from "babylonjs";
import { hl, newSceneColors } from "../env";
import { buttonPlay, buttonPlayBackgroundColor, textRemindShapeCtr } from "../GUI/gui";
import { shapeL } from "../shapeL";
import { shapeM, shapeMRender } from "../shapeM";
import { shapeP } from "../shapeP";

export let isWin = false
export function setIsWin(boolean: boolean){isWin = boolean}

export const goToPlayScreen = () => {
  isWin = true
  removeMeshes();
  //new colors
  newSceneColors();

  // only shapeM on start play screen
  shapeMRender();
  updateGUI();
};

 const removeMeshes = () => {
  shapeM.dispose();
  shapeL.forEach((s) => s.dispose());
  shapeP.dispose();
  hl.dispose();
};

const updateGUI = () => {
  //show button
  buttonPlay.isVisible = true;
  textRemindShapeCtr.isVisible = false;
  buttonPlayBackgroundColor();
};
