import { Color3, Mesh, Scalar, SolidParticleSystem, StandardMaterial, Vector3 } from "@babylonjs/core";
import { colorShapePL, shapePColor } from "./env";
import { scene } from "./scene";
import { shapeInit } from "./shapeInit";
import { shapeL } from "./shapeL";
import { checkCollision, positionShape } from "./shapeEdit";
import { numShapeP, scaleShapePL, whichShapeP } from "./variables";

export let shapeP: Mesh;

export function shapePRender() {
  // let shapeLScaling = shapeL

  // Create shapeP
  const shapePSps = shapeInit(whichShapeP);

  const SPS = new SolidParticleSystem("SPS", scene); //create the SPS

  SPS.addShape(shapePSps, numShapeP); // add as many copies as you want to the SPS
  shapePSps.dispose(); //dispose of the original mesh
  const spsMesh = SPS.buildMesh(); //builds the SPS mesh

  //Set the function to initialize the particle properties
  SPS.initParticles = () => {
    for (let p = 0; p < SPS.nbParticles; p++) {
      const particle = SPS.particles[p];
      // Place vector orientation in 3D space
      let direction: Vector3;
      const setDirection = () => {
        direction = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      };
      setDirection();
      positionShape(particle, direction);

      particle.scaling = scaleShapePL(); //scale before collision, boundingbox growth
      //check every shapeL position each time against this shape till not overlapping
      while (shapeL.length > 0 && !checkCollision(shapeL, particle)) {
        setDirection();
        positionShape(particle, direction);
      }

      particle.rotation.x = Scalar.RandomRange(0, Math.PI);
      particle.rotation.y = Scalar.RandomRange(0, Math.PI);
      particle.rotation.z = Scalar.RandomRange(0, Math.PI);

      particle.color = colorShapePL().toColor4()
    //   //lerp with low saturation hex color
    //   const partSat = Color3.Lerp(shapePColor, Color3.FromHexString("#858585"), Math.random() / 2.5);
    //   //lerp with low luminance hex color
    //   particle.color = Color3.Lerp(partSat, Color3.FromHexString("#56321d"), Math.random() / 2.5).toColor4();
    }
  };

  SPS.initParticles(); //call the initializing function
  SPS.setParticles(); //apply the properties and display the mesh

  shapeP = spsMesh;
  let shapePMat = new StandardMaterial("shapePMat", scene);
  shapeP.material = shapePMat;
  // shapePMat.diffuseColor = shapePColor
  shapePMat.specularColor = new Color3(0.3, 0.3, 0.3);
}
