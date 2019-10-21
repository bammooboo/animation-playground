export default () => {
  let shadowScene;
  let shadowCamera;
  let shadowRenderer;
  let shadowCubeOne;
  let shadowCubeTwo;
  let spotLight;
  let plane;
  let shadowAdd = 0.01;
  let theta = 0;

  function init() {
    shadowAnimation();
  }

  function createGeometry() {
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshPhongMaterial({ color: 0xdff913, shininess: 100, side: THREE.DoubleSide });
    shadowCubeOne = new THREE.Mesh(geometry, material);
    shadowCubeOne.position.set(5, 2, 0);
    shadowCubeOne.castShadow = true;
    shadowCubeOne.receiveShadow = true;

    geometry = new THREE.BoxGeometry(5, 6, 4);
    shadowCubeTwo = new THREE.Mesh(geometry, material);
    shadowCubeTwo.position.set(-4, 2, 0);
    shadowCubeTwo.castShadow = true;

    geometry = new THREE.BoxGeometry(2000, 1, 2000);
    material = new THREE.MeshPhongMaterial({ color: 0x693421, side: THREE.DoubleSide });
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = -1;
    plane.receiveShadow = true;

    shadowScene.add(shadowCubeOne);
    shadowScene.add(shadowCubeTwo);
    shadowScene.add(plane);
  }

  function shadowAnimation() {
    shadowScene = new THREE.Scene();
    shadowScene.background = new THREE.Color(0x000000);
    shadowScene.fog = new THREE.Fog(0x000000);

    shadowCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    shadowCamera.position.set(0, 5, 40);

    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 15, 10);
    spotLight.angle = Math.PI / 2;
    spotLight.prenumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;

    //shadow
    spotLight.castShadow = true;

    spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500));
    spotLight.shadow.bias = 0.0001;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 1024;

    shadowScene.add(spotLight);

    createGeometry();

    shadowRenderer = new THREE.WebGLRenderer();
    shadowRenderer.setSize(window.innerWidth, window.innerHeight);
    shadowRenderer.shadowMap.enabled = true;
    shadowRenderer.shadowMap.type = THREE.PCFShadowMap;
    document.querySelector('.shadows').appendChild(shadowRenderer.domElement);
  }

  function shadowLoop() {
    spotLight.position.x = 10 * Math.sin(theta);
    spotLight.position.z = 10 * Math.cos(theta);
    theta += shadowAdd;

    shadowRenderer.render(shadowScene, shadowCamera);
    requestAnimationFrame(shadowLoop);
  }

  init();
  shadowLoop();
};