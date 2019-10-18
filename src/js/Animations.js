import saturnLoop from "./animations/saturnLoop";
import fragments from "./animations/fragments";

export default () => {
  function init() {
    saturnLoop();
    fragments();
  }

  init();
};