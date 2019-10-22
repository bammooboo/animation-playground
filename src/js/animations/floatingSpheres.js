export default () => {
  let floatScene;
  let floatCamera;
  let floatRenderer;
  let floatLight;
  let floatAdd = 0.2;

  let particles = [];

  const UP = 38;
  const DOWN = 40;

  class Particle {
    constructor() {
      let geometry = new THREE.SphereGeometry(0.5, 30, 30);
      let material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100, specular: 0xafeeee, side: THREE.DoubleSide });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x = randomInRange(-15, 15);
      this.mesh.position.y = randomInRange(-5, 5);
      this.mesh.position.z = randomInRange(-10, 10);
      this.radius = this.mesh.position.x;
      this.theta = 0;
      this.dTheta = 2 * Math.PI / randomInRange(150, 200);
      //random number between 0 and PI - how high in y axis
      this.yFactor = randomInRange(0, Math.PI);
    }
    
    move() {
      this.mesh.position.y = this.radius * Math.sin(this.theta + this.yFactor);
      this.mesh.position.x = this.radius * Math.sin(this.theta);
      this.mesh.position.z = this.radius * Math.cos(this.theta);
      this.theta += this.dTheta;
    }
  };

  function init() {
    floatingAnimation();
  }

  function randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
  }

  function onKeyDown(e) {
    if(e.keyCode == UP) {
      floatCamera.position.z -= floatAdd;
    } else if(e.keyCode == DOWN) {
      floatCamera.position.z += floatAdd;
    }
  }

  function createParticles() {
    for(let i = 1; i <= 50; i++) {
      let p = new Particle();
      particles.push(p);
      floatScene.add(p.mesh);
    }
  }

  function floatingAnimation() {
    floatScene = new THREE.Scene();
    floatScene.background = new THREE.Color(0x000000);

    floatCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    floatCamera.position.z = 20;

    floatLight = new THREE.PointLight(0xffffff, 2, 30, 2);
    let floatLightTwo = new THREE.PointLight(0xffffff, 2, 30, 2);
    let floatLightThree = new THREE.PointLight(0xffffff, 2, 30, 2);

    floatLightTwo.position.y = 10;
    floatLightThree.position.y = -10;

    floatScene.add(floatLight);
    floatScene.add(floatLightTwo);
    floatScene.add(floatLightThree);

    createParticles();

    floatRenderer = new THREE.WebGLRenderer();
    floatRenderer.setSize(window.innerWidth, window.innerHeight);
    document.addEventListener("keydown", onKeyDown, false);
    document.querySelector('.floating').appendChild(floatRenderer.domElement);
  }

  function floatingLoop() {
    particles.forEach(p => p.move());

    floatRenderer.render(floatScene, floatCamera);
    requestAnimationFrame(floatingLoop);
  }

  init();
  floatingLoop();
};