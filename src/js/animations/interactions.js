export default () => {
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;
  
  let cubeScene;
  let cubeCamera;
  let cubeRenderer;
  let cubeLight1;
  let cubes = [];
  let cubeAdd = 0.2;

  function init() {
    cubeAnimation();
  }

  function randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
  }

  function onKeyDown(e) {
    if(e.keyCode == LEFT) {
      cubeAdd = -0.2;
    } else if(e.keyCode == RIGHT) {
      cubeAdd = 0.2;
    } else if(e.keyCode == UP) {
      cubeScene.rotation.x += 0.2;
    } else if(e.keyCode == DOWN) {
      cubeScene.rotation.x -=0.2;
    } else {
      return;
    }
    cubes.forEach(cube => cube.position.x += cubeAdd);
  }

  function createCubes() {
    let geometry = new THREE.BoxGeometry(5, 5, 5);

    for(let i = 1; i <= 10; i++) {
      let material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff, shininess: 100, side: THREE.DoubleSide });
      let cube = new THREE.Mesh(geometry, material);
      cube.position.x = randomInRange(-20, 20);
      cube.position.z = randomInRange(-10, 10);
      cubes.push(cube);
      cubeScene.add(cube);
    }
  }

  function cubeAnimation() {
    cubeScene= new THREE.Scene();
    cubeScene.background = new THREE.Color(0xffffff);

    cubeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    cubeCamera.position.set(0, 10, 40);

    let cubeLight1 = new THREE.DirectionalLight(0xffffff, 1);
    cubeScene.add(cubeLight1);
    createCubes();

    cubeRenderer = new THREE.WebGLRenderer();
    cubeRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.cubes').appendChild(cubeRenderer.domElement);
    document.addEventListener("keydown", onKeyDown, false);
  }

  function cubeLoop() {

    cubeRenderer.render(cubeScene, cubeCamera);
    requestAnimationFrame(cubeLoop);
  }

  init();
  cubeLoop();
};