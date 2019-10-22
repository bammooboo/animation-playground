export default () => {
  let torusScene;
  let torusCamera;
  let torusRenderer;
  let torusSpotlightOne;
  let torusSpotlightTwo;
  let torus;
  let newTorus;
  let anotherTorus;

  function init() {
    torusAnimation();
  }

  function createTorus() {

    let geometry = new THREE.TorusKnotGeometry(16, 2, 500, 2, 2, 240);
    let material = new THREE.MeshPhongMaterial({ color: 0x004e4e, shininess: 100, specular: 0xafeeee, side: THREE.DoubleSide, wireframe: true });

    torus = new THREE.Mesh(geometry, material);
    torus.scale.x = 0.1;
    torus.scale.y = 0.1;
    torus.scale.z = 0.1;

    geometry = new THREE.TorusKnotGeometry(14, 2, 500, 6, 6, 240);
    material = new THREE.MeshPhongMaterial({ color: 0x008080, shininess: 100, specular: 0xafeeee, side: THREE.DoubleSide, wireframe: true });

    newTorus = new THREE.Mesh(geometry, material);
    newTorus.position.x = -4;
    newTorus.position.y = -1.5;
    newTorus.scale.x = 0.1;
    newTorus.scale.y = 0.1;
    newTorus.scale.z = 0.1;

    geometry = new THREE.TorusKnotGeometry(10, 1.6, 500, 6, 6, 20);
    material = new THREE.MeshPhongMaterial({ color: 0x004d4d, shininess: 100, wireframe: true });
    anotherTorus = new THREE.Mesh(geometry, material);

    anotherTorus.scale.x = 0.1;
    anotherTorus.scale.y = 0.1;
    anotherTorus.scale.z = 0.1;

    anotherTorus.position.x = 4;
    anotherTorus.position.y = 1.5;

    torusScene.add(torus);
    torusScene.add(newTorus);
    torusScene.add(anotherTorus);
  }

  function torusAnimation() {
    torusScene = new THREE.Scene();
    torusScene.background = new THREE.Color(0x001b1b);

    torusCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    torusCamera.position.z = 5;

    torusSpotlightOne = new THREE.SpotLight(0xfffffff);
    torusSpotlightOne.position.set(1000, 1000, 1000);
    torusScene.add(torusSpotlightOne);

    torusSpotlightTwo = new THREE.SpotLight(0xfffffff);
    torusSpotlightTwo.position.set(-500, -500, -500);
    torusScene.add(torusSpotlightTwo);

    createTorus();

    torusRenderer = new THREE.WebGLRenderer();
    torusRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.torus').appendChild(torusRenderer.domElement);
  }

  function torusLoop() {
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.005;

    newTorus.rotation.x += -0.005;
    newTorus.rotation.y += -0.005;
    newTorus.rotation.z += -0.005;

    anotherTorus.rotation.x += -0.005;
    anotherTorus.rotation.y += -0.005;
    anotherTorus.rotation.z += -0.005;

    torusRenderer.render(torusScene, torusCamera);
    requestAnimationFrame(torusLoop);
  }

  init();
  torusLoop();
};