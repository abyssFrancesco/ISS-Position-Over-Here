import * as THREE from "three";
import gsap from "gsap";
import { color } from "three/tsl";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragemt.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

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
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./assets/uv_globe2.jpg"),
      },
    },
  })
);
/* console.log(sphere); */

/* scene.add(sphere); */

/* Create anothere sphere to make an atmosphere */
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    /* shadow on the backside */
    side: THREE.BackSide,
  })
);
/* console.log(sphere); */
/* Movimento del muose normalizzando il valore della posizione del mouse sullo schermo, quindi invece di ricevere 0 to innerwidht & innerheight */
const mouse = {
  x: undefined,
  y: undefined,
};
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);
//crete a group to put in different stuff
const group = new THREE.Group();
group.add(sphere);
scene.add(group);

camera.position.z = 15;

function animate() {
  /* sphere.rotation.x += 0.01; */
  sphere.rotation.y += 0.001;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  /*  group.rotation.y = mouse.x * 0.5; */
  /* group.rotation.x = mouse.y * 0.5; */
  /* We use gsap to interpolate the animation */
  gsap.to(group.rotation, {
    y: mouse.y * 0.5,
    x: mouse.x * 0.5,
  });
}
/* renderer.setAnimationLoop(animate); */
animate();

addEventListener("mousemove", () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  console.log(mouse);
});
