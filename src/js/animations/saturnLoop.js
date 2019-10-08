export default () => {
  //For saturn section
  let saturnScene;
  let saturnCamera = '';
  let saturnRenderer;
  let planet;
  let rings = [];
  let saturnAdd = 0.01;

  function init() {
    saturnAnimation();
  }

  function createSaturn() {
    //create inner spherical planet
    let geometry = new THREE.SphereGeometry(0.4, 30, 30);
    let material = new THREE.MeshBasicMaterial({color: 0x8d5524, wireframe: true});
    planet = new THREE.Mesh(geometry, material);
    saturnScene.add(planet);

    // //create rings
    geometry = new THREE.TorusGeometry(0.51, 0.07, 2, 70);
    material = new THREE.MeshBasicMaterial({color: 0xffe39f, wireframe: true});
    let ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(0.69, 0.07, 2, 70);
    material = new THREE.MeshBasicMaterial({color: 0xffad60, wireframe: true});
    ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(0.85, 0.07, 2, 70);
    material = new THREE.MeshBasicMaterial({color: 0xeac086, wireframe: true});
    ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    //to set correct perspective/angle of planet
    rings.forEach(ring => {
      ring.rotation.x = 1.7;
      ring.rotation.y = 0.1;
      saturnScene.add(ring);
    });
  }

  function saturnAnimation() {
    saturnScene= new THREE.Scene();
    saturnScene.background = new THREE.Color(0x000000);

    saturnCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    saturnCamera.position.z = 4;

    // let saturnAxes = new THREE.AxesHelper(5);
    // saturnScene.add(saturnAxes);
    createSaturn();

    saturnRenderer = new THREE.WebGLRenderer();
    saturnRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.saturn').appendChild(saturnRenderer.domElement);
  }

  function saturnLoop() {
    //create movement of camera around planet

    // saturnCamera.position.y += saturnAdd;
    // saturnCamera.position.x += saturnAdd;
    // saturnCamera.position.z += saturnAdd;

    saturnScene.rotation.y += 0.009;
    // saturnScene.rotation.y += 0.001;
    // saturnScene.rotation.z += saturnAdd;

    // if(saturnCamera.position.x >= 0.4 || saturnCamera.position.x <= -0.4) {
    //   saturnAdd *= -1;
    // }

    saturnRenderer.render(saturnScene, saturnCamera);
    requestAnimationFrame(saturnLoop);
  }

  init();
  saturnLoop();
};