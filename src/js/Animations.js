import saturnLoop from "./animations/saturnLoop";
import fragments from "./animations/fragments";
import interactions from "./animations/interactions";
import mouse from "./animations/mouse";
import spheres from "./spheres";
import sphereCreator from "./sphereCreator";
import balloons from "./balloons";
import textures from "./animations/textures";
import panoramaTexture from "./animations/panoramaTexture";

export default () => {
  function init() {
    saturnLoop();
    fragments();
    interactions();
    mouse();
    spheres();
    sphereCreator();
    balloons();
    textures();
    panoramaTexture();
  }

  init();
};