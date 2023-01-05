import {
  ActionManager,
  AxesViewer,
  Color3,
  CreateSphere,
  ExecuteCodeAction,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { colorShapePL, hl, shapeMColor, shapePColor } from "./env";
import { goToPlayScreen } from "./goTo.ts/goToPlayScreen";
import { textPointCtr, textRemindShapeCtr } from "./GUI/gui";
import { scene } from "./scene";
import { checkCollision, positionShape } from "./shapeEdit";
import { shapeInit } from "./shapeInit";
import { shapeM } from "./shapeM";
import { numShapeL, points, scaleShapePL, updatePoint, whichShapeML } from "./variables";

//shapeL position use for check collision
export let shapeL: Mesh[];
export let numShapeLFind: number;

export function shapeLRender() {
  shapeL = [];
  
  numShapeLFind = 0;
  for (let i = 0; i < numShapeL; i++) {
    let shape = shapeInit(whichShapeML);
    let isFind = false;

    // Place vector orientation in 3D space
    let direction: Vector3;
    const setDirection = () => {
      direction = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      // direction = scene?.activeCamera?.position.clone(); //! test variable, .clone() to prevent refresh
    };
    // shape.position = direction; //! test variable
    setDirection();
    positionShape(shape, direction);


    shape.scaling = scaleShapePL(); //scale before collision, boundingbox growth
    while (shapeL.length > 0 && !checkCollision(shapeL, shape)) {
      setDirection();
      positionShape(shape, direction);
    }

    // shapeInitEnv(direction) // !shapeInit size test environnement

    // color same as shapeP
    shape.material = new StandardMaterial(`shapeL${i}Mat`, scene);
    // shape.material = new StandardMaterial(`shapeLMat`, scene);
    (shape.material as StandardMaterial).diffuseColor = colorShapePL();
    (shape.material as StandardMaterial).specularColor = new Color3(0.1, 0.1, 0.1);

    //EVENT

    shape.actionManager = new ActionManager(scene);
    shape.actionManager.hoverCursor = "default";


    shape.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, aShapeLIsFind));
    function aShapeLIsFind() {
      if (!isFind) {  // prevent if shape was already clicked
        numShapeLFind++;
        // todo addTime() +5s Yeah! with animation
        // todo addCount() +1 .maybe sometime can win more than 1 point, or -1 ?
        //todo if time === 0, popup gain 10s > watch ad or buy with gems, or reset and play again 
        //todo gain 10s up to the number of "life" ( maybe 3 max)
        //todo in-game each 100 points player gain one life ( heart animation <3)
        hl.addMesh(shape, shapeMColor); // set to same highlight as shapeM
        shape.material = shapeM.material; // set to same color as shapeM
        updatePoint(1)
        textPointCtr.text = `${points}`;
        textRemindShapeCtr.text = `${numShapeL-numShapeLFind}`;
        isFind = !isFind;
      }
      if (numShapeLFind === numShapeL) {goToPlayScreen()}
    }

    shapeL.push(shape);
  }
}

const shapeInitEnv = (direction: Vector3) => {
  const shapeCreate = CreateSphere("shapeMInit", { segments: 16, updatable: true }, scene);
  positionShape(shapeCreate, direction.add(new Vector3(0, 0.0, 0)));
  const testMat = new StandardMaterial("myMaterial", scene);
  testMat.diffuseColor = Color3.Red();
  shapeCreate.material = testMat;
  const axes = new AxesViewer(scene, 2);
  axes.xAxis.parent = shapeCreate;
  axes.yAxis.parent = shapeCreate;
  axes.zAxis.parent = shapeCreate;
};
