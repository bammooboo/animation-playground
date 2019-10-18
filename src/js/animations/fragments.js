export default () => {
  let fragmentScene;
  let fragmentCamera = '';
  let fragmentRenderer;
  let fragments = [];
  let ADD = 0.05;
  const dt = 0.02;

  class Fragment {
    constructor(position, velocity, g) {
      this.velocity = velocity;
      this.velocity.multiplyScalar(dt);

      let material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: 0xffffff, emissive: 0xfafafa, emissiveIntensity: 0.4, shininess: 100, specular: 0x9d0a00, vertexColors: true });

      this.shape = new THREE.Mesh(g, material);
      this.shape.position.copy(position);
    }

    move() {
      this.shape.position.add(this.velocity);
      this.shape.rotation.x += ADD;
    }
  };

  function init() {
    fragmentAnimation();
  }

  function createTriangle(p1, p2, p3) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(p1, p2, p3);
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
  }

  function createGeometry() {
    let p1 = new THREE.Vector3(0, 1, 0);
    let p2 = new THREE.Vector3(1, 0, 1);
    let p3 = new THREE.Vector3(-1, 0, 1);
    let p4 = new THREE.Vector3(-1, 0, -1);
    let p5 = new THREE.Vector3(1, 0, -1);
    let p6 = new THREE.Vector3(0, -1, 0);

    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 6), createTriangle(p1, p2, p3)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2, 4, 0), createTriangle(p1, p3, p4)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, -4), createTriangle(p1, p4, p5)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 3, 0), createTriangle(p1, p5, p2)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -5, 3), createTriangle(p3, p2, p6)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-4, -3, 0), createTriangle(p6, p3, p4)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -4, -4), createTriangle(p6, p4, p5)));
    fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, -3, 0), createTriangle(p6, p2, p5)));

    fragments.forEach(f => fragmentScene.add(f.shape));
  }

  function fragmentAnimation() {
    fragmentScene= new THREE.Scene();
    fragmentScene.background = new THREE.Color(0x000000);

    fragmentCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    fragmentCamera.position.z = 20;

    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    fragmentScene.add(directionalLightUp);

    createGeometry();

    fragmentRenderer = new THREE.WebGLRenderer();
    fragmentRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.fragments').appendChild(fragmentRenderer.domElement);
  }

  function fragmentLoop() {
    fragments.forEach(f => f.move());
    fragmentRenderer.render(fragmentScene, fragmentCamera);
    requestAnimationFrame(fragmentLoop);
  }

  init();
  fragmentLoop();
};