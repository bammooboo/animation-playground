export default () => {
  let blockScene;
  let blockCamera;
  let blockRenderer;
  let blockLight;
  let blockLightOne;
  let rayCast;
  let mouse;
  let block;
  let sphere;
  let blockAdd = 0.05;

  function init() {
    blockAnimation();
  }

  function onMouseClick(e) {
    blockAdd *= -1;
    //get clicked positions
    let x = e.clientX;
    let y = e.clientY;
    console.log(x + ", " + y);

    // to normalize co-ordinates
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
    //cast new ray on every mouse click
    rayCast.setFromCamera(mouse, blockCamera);
  }

  function createBlock() {
    let geometry = new THREE.SphereGeometry(5, 30, 30);
    let material = new THREE.MeshPhongMaterial({ color: 0x0450fb, shininess: 100, side: THREE.DoubleSide });
    sphere = new THREE.Mesh(geometry, material);

    geometry = new THREE.BoxGeometry(5, 5, 5);
    material = new THREE.MeshPhongMaterial({ color: 0xff4500, shininess: 100, side: THREE.DoubleSide });
    block = new THREE.Mesh(geometry, material);

    sphere.position.set(1, 4, -10);
    blockScene.add(sphere);
    blockScene.add(block);
    // let geometry = new THREE.BoxGeometry(5, 5, 5);
    // let material = new THREE.MeshPhongMaterial({ color: 0xaf62ff, shininess: 100, side: THREE.DoubleSide });
    // block = new THREE.Mesh(geometry, material);
    // blockScene.add(block);
  }

  function blockAnimation() {
    blockScene = new THREE.Scene();
    blockScene.background = new THREE.Color(0xffffff);

    blockCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    blockCamera.position.set(0, 0, 35);

    blockLight = new THREE.DirectionalLight(0xffffff, 1);
    blockLightOne = new THREE.DirectionalLight(0xffffff, 1);
    blockLightOne.position.set(0, -5, 2);
    blockScene.add(blockLight);
    blockScene.add(blockLightOne);

    createBlock();

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1;

    blockRenderer = new THREE.WebGLRenderer();
    blockRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.blocks').appendChild(blockRenderer.domElement);
    document.addEventListener("click", onMouseClick, false);
  }

  function blockLoop() {
    block.rotation.x += blockAdd;
    block.rotation.y += blockAdd;

    sphere.material.color.set(0x0450fb);
    block.material.color.set(0xff4500);

    //create array of objects in the raycast

    let intersects = rayCast.intersectObjects(blockScene.children);
    intersects.forEach(obj => obj.object.material.color.set(0x00ff00));

    blockRenderer.render(blockScene, blockCamera);
    requestAnimationFrame(blockLoop);
  }

  init();
  blockLoop();
};