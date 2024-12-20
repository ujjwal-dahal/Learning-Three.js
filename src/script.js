import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//Scene Banaune
const scene = new THREE.Scene();

//camera banaune
const size = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

//camera ko position
// camera.position.z = 5;

camera.position.set(-3, 0, 5);

//camera ma scene add garne
scene.add(camera);

//Object banaune

const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(box, material);

camera.lookAt(mesh.position);

scene.add(mesh);

const kahaRenderGarne = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas: kahaRenderGarne });
renderer.setSize(size.width, size.height);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  //Everytime camera ko value change garim bhane updateProjectionMatrix() lai run garne
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();

const control = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  control.update();
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime;
  mesh.rotation.z = elapsedTime;
  mesh.rotation.x = elapsedTime;
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
