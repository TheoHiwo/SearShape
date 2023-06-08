// import { AdvancedDynamicTexture, Rectangle } from "babylonjs-gui";

import { Color3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, TextBlock } from "@babylonjs/gui";
import { setIsWin } from "../goTo.ts/goToPlayScreen";
import { shapeLRender } from "../shapeL";
import { shapePRender } from "../shapeP";
import { numShapeL, points } from "../variables";

export let buttonPlay: Button;
export let textPointCtr: TextBlock;
export let textRemindShapeCtr: TextBlock;
export let textTimer: TextBlock;
export let isPaused = false;
export let loadedGui: AdvancedDynamicTexture;

let timeLeft: number = 10000; // in milliseconds = 10s
//todo check second abnormal speed
export const GUI = () => {
  // GUI
  loadedGui = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  //todo slider set difficulty variables

  //Create TIMER for time reminding
  // todo color change to red when low, faster faster! scale blink pattern
  textTimer = new TextBlock("timer");
  textTimer.width = "30%";
  textTimer.height = "30%";
  textTimer.text = `${timeLeft/1000}`;
  textTimer.color = "white";
  textTimer.fontSize = 25;
  textTimer.fontWeight = "400";
  textTimer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  textTimer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  textTimer.zIndex = -1;
  // loadedGui.addControl(textTimer);

  //Create REMAINING SHAPE COUNTER  for shape to finds
  textRemindShapeCtr = new TextBlock("remindShapeCtr");
  textRemindShapeCtr.isVisible = false;
  textRemindShapeCtr.width = "100px";
  textRemindShapeCtr.height = "100px";
  textRemindShapeCtr.text = `${numShapeL}`;
  textRemindShapeCtr.color = "white";
  textRemindShapeCtr.fontSize = 45;
  textRemindShapeCtr.fontWeight = "500";
  // textRemindShapeCtr.top = "0%";
  // textRemindShapeCtr.left = "0%";

  textRemindShapeCtr.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  textRemindShapeCtr.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  textRemindShapeCtr.zIndex = -1;
  loadedGui.addControl(textRemindShapeCtr);

  //Create PLAY GAME button
  buttonPlay = Button.CreateSimpleButton("butPlay", "PLAY");
  buttonPlay.width = "50%";
  buttonPlay.height = "7%";
  buttonPlay.top = "35%";
  buttonPlay.color = "white";
  buttonPlay.fontSize = "3%";
  buttonPlay.cornerRadius = 20;
  buttonPlayBackgroundColor();
  buttonPlay.hoverCursor = "pointer";
  buttonPlay.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  //   buttonPlay.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

  buttonPlay.onPointerUpObservable.add(function () {
    // start again
    setIsWin(false);
    //todo use difficulty variables and generate game depending of them
    //hide button
    buttonPlay.isVisible = false;
    //show remind shape to find counter
    textRemindShapeCtr.isVisible = true;
    textRemindShapeCtr.text = `${numShapeL}`
    //todo add some animation like world rotation
    // Little shapes to find
    shapeLRender();
    // Particle shapes
    shapePRender();
/* 
    // setInterval here = update this function every 1 second
    let t = setInterval(function () {
      // if the time is not paused (isPaused is false)
      // increment current Time by 1
      if (!isPaused) {
        timeLeft -= 1000;
        textTimer.text =`${timeLeft/1000}`; // convert millisecond in second to render
      }
    }, 1000); // 1000 = 1s
 */
    // play() starts the timer
    function play() {
      isPaused = false;
    }
    // when pause() function is called
    // pause the timer and save the current time value to targeted Element or Variable
    // in this case var = time
    function pause() {
      isPaused = true;
    }
  });

  loadedGui.addControl(buttonPlay);

   // //Create PAUSE/PLAY button
  // //todo convert text to icon
  // buttonPlay = Button.CreateSimpleButton("butPlay", "PLAY");
  // buttonPlay.width = "50%";
  // buttonPlay.height = "7%";
  // buttonPlay.top = "35%";
  // buttonPlay.color = "white";
  // buttonPlay.fontSize = "3%";
  // buttonPlay.cornerRadius = 20;
  // buttonPlayBackgroundColor();
  // buttonPlay.hoverCursor = "pointer";
  // buttonPlay.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  // //   buttonPlay.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

  // buttonPlay.onPointerUpObservable.add(function () 

  //Create POINT COUNTER for shape finds
  textPointCtr = new TextBlock("pointCtr");
  textPointCtr.width = "30%";
  textPointCtr.height = "30%";
  textPointCtr.text = `${points}`;
  textPointCtr.color = "white";
  textPointCtr.fontSize = 110;
  textPointCtr.fontWeight = "800";
  textPointCtr.top = "-35%";
  textPointCtr.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  textPointCtr.zIndex = -1;
  loadedGui.addControl(textPointCtr);

};

//button background color
export const buttonPlayBackgroundColor = () => {
  buttonPlay.background = Color3.FromHexString("#BB7349").toHexString();
};
