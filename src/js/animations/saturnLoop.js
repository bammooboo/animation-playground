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
    let material = new THREE.MeshBasicMaterial({color: 0x191919, wireframe: true});

    let planetMaterial = new THREE.MeshLambertMaterial({color: 0x7fc5f9, emissive: 0x25673d, emissiveIntensity: 0.5});

    let otherMaterial = new THREE.MeshPhongMaterial({color: 0x7fc5f9, emissive: 0x191919, emissiveIntensity: 0.5, shininess: 100, specular: 0x9d0a00});

    let realMaterial = new THREE.MeshStandardMaterial({color: 0x7fc5f9, emissive: 0x191919, emissiveIntensity: 0.4, metalness: 1, roughness: 1});

    planet = new THREE.Mesh(geometry, realMaterial);
    saturnScene.add(planet);

    // //create rings
    geometry = new THREE.TorusGeometry(0.51, 0.07, 2, 50);
    material = new THREE.MeshBasicMaterial({color: 0x666666});
    let ring = new THREE.Mesh(geometry, otherMaterial);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(0.69, 0.07, 2, 50);
    material = new THREE.MeshBasicMaterial({color: 0x4c4c4c});
    ring = new THREE.Mesh(geometry, otherMaterial);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(0.85, 0.07, 2, 50);
    material = new THREE.MeshBasicMaterial({color: 0x323232});
    ring = new THREE.Mesh(geometry, otherMaterial);
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

    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    saturnScene.add(directionalLightUp);

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