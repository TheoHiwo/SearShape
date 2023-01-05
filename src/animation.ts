import { hl } from "./env";
import { isWin } from "./goTo.ts/goToPlayScreen";
import { scene } from "./scene";
export let alpha = 0
export let speed_alpha= 0.06
export function setSpeedAlpha() {
speed_alpha *= 2
  // reset speed_alpha for new game
  if (isWin) {speed_alpha = 0.06}
}

export const doAnimations = () => {
  //animation glow

  scene.registerBeforeRender(() => {
    alpha += speed_alpha;

    hl.blurHorizontalSize = 0.3 + Math.cos(alpha) * 0.6 + 0.6;
    hl.blurVerticalSize = 0.3 + Math.sin(alpha / 3) * 0.6 + 0.6;
  });
};