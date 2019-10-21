export default () => {
  let texScene;
  let texCamera;
  let texRenderer;
  let texCube;
  let texSphere;
  let texAdd = 0.02;

  function init() {
    texAnimation();
  }

  function createTextures() {
    //create cube
    // load texture image
    let texture = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8xREH3RMFHT9i58G87JY-a37q4g2JvIPAhgLxYLD8IDIE6V3');

    // let material = new THREE.MeshBasicMaterial({ map: texture });
    let material = new THREE.MeshPhongMaterial({ map: texture });
    //phong material is sensitive to light etc
    let geometry = new THREE.BoxGeometry(4, 4, 4);
    texCube = new THREE.Mesh(geometry, material);

    //create sphere
    texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/c/c1/Expanded_metal.jpg');
    // material = new THREE.MeshBasicMaterial({ map: texture });
    material = new THREE.MeshPhongMaterial({ map: texture });
    geometry = new THREE.SphereGeometry(4, 30, 30);
    texSphere = new THREE.Mesh(geometry, material);
    texSphere.position.set(-7, 2, -2);

    texScene.add(texCube);
    texScene.add(texSphere);
  }

  function texAnimation() {
    texScene = new THREE.Scene();
    texScene.background = new THREE.Color(0xffffff);

    texCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    texCamera.position.z = 20;

    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    texScene.add(directionalLightUp);
    
    let directionalLightDown = new THREE.DirectionalLight(0xabcdef);
    directionalLightDown.position.y = -1;
    texScene.add(directionalLightDown);
    texScene.add(directionalLightUp);
    createTextures();

    texRenderer = new THREE.WebGLRenderer();
    texRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.textures').appendChild(texRenderer.domElement);
  }

  function texLoop() {
    texCube.rotation.x += texAdd;
    texCube.rotation.y += texAdd;

    texSphere.rotation.x += texAdd;
    texSphere.rotation.y += texAdd;

    texRenderer.render(texScene, texCamera);
    requestAnimationFrame(texLoop);
  }

  init();
  texLoop();
};