export default () => {
  let panScene;
  let panCamera;
  let panRenderer;
  let panSphere;
  let target;
  let texture;
  let panAdd = 0.05;
  let theta = 0;

  function init() {
    panAnimation();
  }

  function createPanTextures() {
    texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kanchenjunga_India.jpg/1280px-Kanchenjunga_india.jpg');

    let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }); //must be double side or won't see image
    let geometry = new THREE.SphereGeometry(5, 100, 100);
    panSphere = new THREE.Mesh(geometry, material);
    panScene.add(panSphere);
  }

  function panAnimation() {
    panScene = new THREE.Scene();
    panScene.background = new THREE.Color(0xffffff);

    panCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    target = new THREE.Object3D();
    panCamera.lookAt(target.position);

    createPanTextures();

    panRenderer = new THREE.WebGLRenderer({ antialising: true });
    panRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.panorama').appendChild(panRenderer.domElement);
  }

  function panLoop() {
    target.position.x = 10 * Math.sin(theta);
    target.position.z = 10 * Math.cos(theta);
    theta += panAdd;
    panCamera.lookAt(target.position);
    panRenderer.render(panScene, panCamera);
    requestAnimationFrame(panLoop);
  }

  init();
  panLoop();
};