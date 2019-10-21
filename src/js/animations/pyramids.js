export default () => {
  let pyramidScene;
  let pyramidCamera;
  let pyramidRenderer;
  let pyramidLight;
  let pyramidPlane;
  let pyramidAdd = 0.01;
  let theta = 0;

  function init() {
    pyramidAnimation();
  }

  function createPyramid(x, y, z, width, height) {
    let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/3/3b/Tuff_ohyaishi02.jpg');
    let geometry = new THREE.CylinderGeometry(0, width, height, 4);
    let material = new THREE.MeshLambertMaterial({ map: texture });
    let p = new THREE.Mesh(geometry, material);
    p.position.set(x, y, z);
    p.castShadow = true;
    p.receiveShadow = true;
    return p;
  }

  function createPyramidGeometry() {
    let texture = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8xREH3RMFHT9i58G87JY-a37q4g2JvIPAhgLxYLD8IDIE6V3');
    let material = new THREE.MeshLambertMaterial({ map: texture });
    let geometry = new THREE.BoxGeometry(1000, 1, 1000);
    pyramidPlane = new THREE.Mesh(geometry, material);
    pyramidPlane.position.y = -1;
    pyramidPlane.receiveShadow = true;

    pyramidScene.add(pyramidPlane);
    pyramidScene.add(createPyramid(0, 0, 0, 20, 25));
    pyramidScene.add(createPyramid(10, 0, -20, 30, 40));
    pyramidScene.add(createPyramid(30, 0, -30, 25, 35));
    pyramidScene.add(createPyramid(-15, 0, -15, 10, 10));
  }

  function pyramidAnimation() {
    pyramidScene = new THREE.Scene();
    pyramidScene.background = new THREE.Color(0xffffff);
    pyramidScene.fog = new THREE.Fog(0x000000);

    pyramidCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    pyramidCamera.position.set(0, 10, 40);

    pyramidLight = new THREE.DirectionalLight(0xffffff, 1);
    pyramidLight.castShadow = true;

    pyramidLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500));
    pyramidLight.shadow.bias = 0.0001;
    pyramidLight.shadow.mapSize.width = 2048;
    pyramidLight.shadow.mapSize.height = 1024;
    pyramidLight.position.set(10, 20, 20);

    pyramidScene.add(pyramidLight);

    createPyramidGeometry();

    pyramidRenderer = new THREE.WebGLRenderer();
    pyramidRenderer.setSize(window.innerWidth, window.innerHeight);
    pyramidRenderer.shadowMap.enabled = true;
    pyramidRenderer.shadowMap.type = THREE.PCFShadowMap;
    document.querySelector('.pyramids').appendChild(pyramidRenderer.domElement);
  }

  function pyramidLoop() {
    pyramidLight.position.x = 20 * Math.sin(theta);
    pyramidLight.position.z = 20 * Math.cos(theta);
    theta += pyramidAdd;

    pyramidRenderer.render(pyramidScene, pyramidCamera);
    requestAnimationFrame(pyramidLoop);
  }

  init();
  pyramidLoop();
};