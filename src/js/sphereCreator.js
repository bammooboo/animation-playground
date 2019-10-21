export default () => {
  let sphereScene;
  let sphereCamera;
  let sphereRenderer;
  let sphereLight;
  let rayCast;
  let mouse;
  const RADIUS = 5;

  function init() {
    sphereAnimation();
  }

  function onMouseClick(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
    //cast new ray on every mouse click
    rayCast.setFromCamera(mouse, sphereCamera);
    createSphere(rayCast.ray.at(40));
  }

  function createSphere(pos) {
    console.log(pos);
    let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
    let material = new THREE.MeshPhongMaterial({ color: 0x4a57fa, shininess: 100, side: THREE.DoubleSide });
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(pos.x, pos.y, pos.z);
    sphereScene.add(sphere);
  }

  function sphereAnimation() {
    sphereScene = new THREE.Scene();
    sphereScene.background = new THREE.Color(0xffffff);

    sphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    sphereCamera.position.set(0, 0, 40);

    sphereLight = new THREE.DirectionalLight(0xffffff, 1);
    sphereScene.add(sphereLight);

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1;

    sphereRenderer = new THREE.WebGLRenderer();
    sphereRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.spheres').appendChild(sphereRenderer.domElement);
    document.addEventListener("click", onMouseClick, false);
  }

  function sphereLoop() {
    sphereRenderer.render(sphereScene, sphereCamera);
    requestAnimationFrame(sphereLoop);
  }

  init();
  sphereLoop();
};