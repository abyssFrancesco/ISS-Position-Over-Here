import * as THREE from "three";
import { color } from "three/tsl";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragemt.glsl";

/* console.log(vertexShader); */
/* console.log(fragmentShader); */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
/* Make it sharper */
renderer.setPixelRatio(Window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

/* const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); */
/* 
camera.position.z = 5; */

/* Create a Spere */
/* Sphere takes 3 arguments 1) radius, 2) how many width segment we want within our sphere, 3) Materiul */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  /*  We are gonna use our own shader instead of the basicmesh: MeshBasicMaterial */
  new THREE.ShaderMaterial({
    /* color: 0xFF0000 */
    /* map: new THREE.TextureLoader().load("./assets/uv_globe2.jpg"), */
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  })
);
/* console.log(sphere); */

scene.add(sphere);
camera.position.z = 15;

function animate() {
  /*  sphere.rotation.x += 0.01; */
  /*  sphere.rotation.y += 0.01;  */

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
/* renderer.setAnimationLoop(animate); */
animate();
