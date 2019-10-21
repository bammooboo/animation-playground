export default () => {
  let sphereScene;
  let sphereCamera;
  let sphereRenderer;
  let sphereLight;
  let rayCast;
  let mouse;
  let spheres = [];
  let sphereAdd = 0.01;
  let theta = 0;
  const RADIUS = 5;
  const BASE_X = -20;
  const BASE_Y = -20;

  function init() {
    sphereAnimation();
  }

  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
    //cast new ray on every mouse click
    rayCast.setFromCamera(mouse, sphereCamera);
    let intersects = rayCast.intersectObjects(sphereScene.children);
    intersects.forEach(obj => obj.object.position.y += 1);
  }

  function createSpheres() {
    let material = new THREE.MeshPhongMaterial({ color: 0x0450fb, shininess: 100, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = BASE_X + j * 2 * (RADIUS + 0.5);
        sphere.position.z = -2*RADIUS * i;
        sphere.position.y = BASE_Y + i * RADIUS;
        sphereScene.add(sphere);
      }
    }
  }

  function sphereAnimation() {
    sphereScene = new THREE.Scene();
    sphereScene.background = new THREE.Color(0xffffff);

    sphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    sphereCamera.position.set(0, 0, 40);

    sphereLight = new THREE.DirectionalLight(0xffffff, 1);
    sphereScene.add(sphereLight);

    createSpheres();

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1;

    sphereRenderer = new THREE.WebGLRenderer();
    sphereRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.spheres').appendChild(sphereRenderer.domElement);
    document.addEventListener("mousemove", onMouseMove, false);
  }

  function sphereLoop() {
    sphereRenderer.render(sphereScene, sphereCamera);
    requestAnimationFrame(sphereLoop);
  }

  init();
  sphereLoop();
};