import { Color3, Color4 } from "@babylonjs/core";
import { Hsluv } from "hsluv";

// Hsluv.value = function() {}
export function Chsl(h: number, s: number, l: number, a: number = 100) {
  let c = new Hsluv();

  // initialize colors
  this.hsluv_h = h; //hue
  this.hsluv_s = s; //saturation
  this.hsluv_l = l; //luminescence

  // set colors
  c.hsluv_h = this.hsluv_h;
  c.hsluv_s = this.hsluv_s;
  c.hsluv_l = this.hsluv_l;
  c.hsluvToRgb(); // calculate rgb values

  // return rgb string readable by css properties
  this.cssRGB = () => {
    return `rgb(${c.rgb_r*255}, ${c.rgb_g*255}, ${c.rgb_b*255})`
  }

  // return rgb string readable by css properties
  this.cssRGBA = () => {
    return `rgb(${c.rgb_r*255}, ${c.rgb_g*255}, ${c.rgb_b*255}, ${a})`
  }

  //_____________________________________________________________________
  // return Color3
  this.c3 = () => {
    return new Color3(c.rgb_r, c.rgb_g, c.rgb_b); }
  // return Color4
  this.c4 = () => {
    return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100); }
  //_____________________________________________________________________

  // return Color objects with set values
  // set hue

  //function rotate hue
  function degree(h: number, d: number) {
    const ChangeDegreeS = d % 360;
    let total = h + ChangeDegreeS;
    c.hsluv_h = total > 360 ? total - 360 : total < 0 ? total + 360 : total;
  }

  this.c3h = function (setHsluv_h: number, changeDegree: number) {
    // use default hue to rotate
    if (setHsluv_h === 0 && arguments.length === 2 && changeDegree != null) {
      degree(c.hsluv_h, changeDegree);
      //set to given hue
    } else if (arguments.length === 1) {
      c.hsluv_h = setHsluv_h;
      // use given hue to rotate
    } else if (arguments.length === 2 && changeDegree != null) {
      degree(setHsluv_h, changeDegree);
    }
    c.hsluvToRgb();
    return new Color3(c.rgb_r, c.rgb_g, c.rgb_b);
  };

  this.c4h = function (setHsluv_h: number, a = 100, changeDegree: number) {
    if (arguments.length <= 2 && changeDegree == null) {
      c.hsluv_h = setHsluv_h;
    } else if (arguments.length === 3 && changeDegree != null) {
      degree(setHsluv_h, changeDegree);
    }
    c.hsluvToRgb();
    return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100);
  };

  // set saturation
  this.c3s = (setHsluv_s: number) => {
    c.hsluv_s = setHsluv_s;
    c.hsluvToRgb();
    return new Color3(c.rgb_r, c.rgb_g, c.rgb_b);
  };

  this.c4s = (setHsluv_s: number) => {
    c.hsluv_s = setHsluv_s;
    c.hsluvToRgb();
    return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100);
  };

  //set luminescence
  this.c3l = (setHsluv_l: number) => {
    c.hsluv_l = setHsluv_l;
    c.hsluvToRgb();
    return new Color3(c.rgb_r, c.rgb_g, c.rgb_b);
  };
  this.c4l = (setHsluv_l: number) => {
    c.hsluv_l = setHsluv_l;
    c.hsluvToRgb();
    return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100);
  };

  //set set color
  this.c3c = function (setHsluv_h: number, setHsluv_s: number, setHsluv_l: number, changeDegree: number) {
    if (arguments.length <= 3 && changeDegree == null) {
      c.hsluv_h += setHsluv_h;
    } else if (arguments.length === 3 && changeDegree != null) {
      const ChangeDegreeS = changeDegree % 360;
      let total = setHsluv_h + ChangeDegreeS;
      c.hsluv_h = total > 360 ? total - 360 : total < 0 ? total + 360 : total;
    }
    c.hsluv_s += setHsluv_s;
    c.hsluv_l += setHsluv_l;
    c.hsluvToRgb();
    return new Color3(c.rgb_r, c.rgb_g, c.rgb_b);
  };

  this.c4c = (setHsluv_h: number, setHsluv_s: number, setHsluv_l: number) => {
    c.hsluv_h = setHsluv_h;
    c.hsluv_s = setHsluv_s;
    c.hsluv_l = setHsluv_l;
    c.hsluvToRgb();
    return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100);
  };

  // Circle between 0 and 360 for HUE Wheel using Hsluv.
  function hueDegree(hue: number, changeDegree: number = 180) {
    // add or subtract 180 to return complementary color.
    const ChangeDegreeS = changeDegree % 360; // Secure ChangeDegree > 360 ex: 361 return 1 (-360), 750 return 30 (-2x360)
    let total = hue + ChangeDegreeS;
    return total > 360 ? total - 360 : total < 0 ? total + 360 : total;
  }
}

//Enter Hsluv Value and return Color4(RGBA) ex:chsl(259.3, 62.4, 50);
export function chsl4(h: number, s: number, l: number, a: number = 100) {
  let c = new Hsluv();
  c.hsluv_h = h;
  c.hsluv_s = s;
  c.hsluv_l = l;
  c.hsluvToRgb();
  return new Color4(c.rgb_r, c.rgb_g, c.rgb_b, a / 100);
}

//Enter Hsluv Value and return Color3(RGB) ex:chsl(259.3, 62.4, 50);
export function chsl3(h: number, s: number, l: number) {
  let c = new Hsluv();
  c.hsluv_h = h;
  c.hsluv_s = s;
  c.hsluv_l = l;
  c.hsluvToRgb();
  return new Color3(c.rgb_r, c.rgb_g, c.rgb_b);
}

//Enter Hsluv Value and return RGB;
export function c(h, s, l) {
  let c = new Hsluv();
  c.hsluv_h = h;
  c.hsluv_s = s;
  c.hsluv_l = l;
  c.hsluvToRgb();
  return [c.rgb_r, c.rgb_g, c.rgb_b];
}

// Circle between 0 and 360 for HUE Wheel using Hsluv.
export function hueDegree(hue: number, changeDegree: number = 180) {
  // add or subtract 180 to return complementary color.
  const ChangeDegreeS = changeDegree % 360; // Secure ChangeDegree > 360 ex: 361 return 1 (-360), 750 return 30 (-2x360)
  let total = hue + ChangeDegreeS;
  return total > 360 ? total - 360 : total < 0 ? total + 360 : total;
}

export {};
