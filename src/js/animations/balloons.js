export default () => {
  let balloonScene;
  let balloonCamera;
  let balloonRenderer;
  let balloonLight;
  let balloonLightOne;
  let rayCast;
  let intersects;
  let mouse;
  let balloons = [];
  let balloonAdd = 0.01;

  class Balloon {
    constructor() {
      let x = randomInRange(-30, 30);
      let z = randomInRange(20, -20);

      let geometry = new THREE.SphereGeometry(3, 30, 30);
      let material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff, shininess: 100 });

      let b = new THREE.Mesh(geometry, material);
      b.position.set(x, 0, z);
      this.object = b;
      balloonScene.add(b);

      //gives each balloon different speeds
      this.balloonAdd = randomInRange(0.05, 0.15);

      //indicates if balloon has reached top of screen
      this.over = false;

      //the uppermost value of Y in screen for balloons to finish
      this.TOP = 50;
    }

    advance() {
      this.object.position.y += this.balloonAdd;
      if (this.object.position.y > this.TOP) {
        //removes balloon from screen
        this.over = true;
      }
    }
  };

  function init() {
    balloonAnimation();
  }

  function randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
  }

  function onMouseClick(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    rayCast.setFromCamera(mouse, balloonCamera);
    intersects = rayCast.intersectObjects(balloonScene.children);

    if (intersects.length == 0) {
      return;
    }

    //get first intersecting object 
    let hit = intersects[0].object;

    balloons.forEach((b, ind) => {
      if(b.object == hit) {
        balloons.splice(ind, 1);
        balloonScene.remove(b.object);
      }
    })

    //pops any balloon in intersects array

    // intersects.forEach(obj => {
    //   balloons.forEach((b, ind) => {
    //     if (b.object == obj.object) {
    //       //checking if clicked balloon is in array of balloons
    //       balloons.splice(ind, 1);
    //       balloonScene.remove(b.object);
    //     }
    //   })
    // })
  }

  function balloonAnimation() {
    balloonScene = new THREE.Scene();
    balloonScene.background = new THREE.Color(0xffffff);

    balloonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    balloonCamera.position.set(0, 10, 40);

    balloonLight = new THREE.DirectionalLight(0xffffff, 1);
    balloonLightOne = new THREE.DirectionalLight(0xffffff, 1);
    balloonLightOne.position.set(0, -5, 2);
    balloonScene.add(balloonLight);
    balloonScene.add(balloonLightOne);

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2(); //2d position
    mouse.x = mouse.y = -1;

    balloonRenderer = new THREE.WebGLRenderer();
    balloonRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.balloons').appendChild(balloonRenderer.domElement);
    document.addEventListener("click", onMouseClick, false);
  }

  function balloonLoop() {
    let rand = Math.random();
    if (rand < 0.05) {
      balloons.push(new Balloon());
    }
    balloons.forEach((b, ind) => {
      b.advance();
      if(b.over) {
        balloons.splice(ind, 1);
        balloonScene.remove(b.object);
      }
    });
    balloonRenderer.render(balloonScene, balloonCamera);
    requestAnimationFrame(balloonLoop);
  }

  init();
  balloonLoop();
};