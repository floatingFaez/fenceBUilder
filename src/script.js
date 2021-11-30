import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()



// Canvas
const canvas = document.querySelector('canvas.webgl')

const textureLoader =new THREE.TextureLoader()
const texture = textureLoader.load( 'fence/Metal_Grill_014_basecolor.jpg' )

const bgTexture = textureLoader.load( 'bg/bg.jpg' )

const colorTexture = textureLoader.load('style/Stylized_Wood_Fence_001_basecolor.jpg')
const alphaTexture = textureLoader.load('style/Stylized_Wood_Fence_001_opacity.jpg')
const heightTexture = textureLoader.load('style/Stylized_Wood_Fence_001_height.png')
const normalTexture = textureLoader.load('style/Stylized_Wood_Fence_001_normal.jpg')
const ambientOcclusionTexture = textureLoader.load('style/Stylized_Wood_Fence_001_ambientOcclusion.jpg')
const roughnessTexture = textureLoader.load('style/Stylized_Wood_Fence_001_roughness.jpg')
const metalTexture = textureLoader.load('style/Stylized_Wood_Fence_001_metallic.jpg')

// Scene
const scene = new THREE.Scene()

// Objects
const bgGeometry = new THREE.PlaneGeometry(4,3)
const geometry1 = new THREE.PlaneGeometry(1,.7)
const geometry2 = new THREE.PlaneGeometry(1,.7)
const geometry3 = new THREE.PlaneGeometry(1,.7)



// Materials

const bgMaterial = new THREE.MeshBasicMaterial({map:bgTexture})
const material = new THREE.MeshStandardMaterial({
    map:colorTexture,
    normalMap:normalTexture,
    alphaMap:alphaTexture,
    aoMap:ambientOcclusionTexture,
    displacementMap: heightTexture,
    roughnessMap:roughnessTexture,
    metalnessMap:metalTexture,
    aoMapIntensity:1,
    displacementScale:0.05,
    roughness:1,
    metalness:0,
    transparent:true
})
material.normalScale.set(0.5,0.5)
// material.color = new THREE.Color(0xff0000)

// Mesh
const plane1 = new THREE.Mesh(geometry1,material)
const plane2 = new THREE.Mesh(geometry2,material)
const plane3 = new THREE.Mesh(geometry3,material)

const group1 = new THREE.Group();
group1.add( plane1 );
group1.add( plane2 );
group1.add( plane3 );


plane2.position.x = 1
plane3.position.x = -1

const newGroup = group1.clone()


// gui.add(group,'rotation').min(0).max(360).onChange((value)=>{
//     group.rotation.y = value
// })

// group1.position.y = .20
// group1.position.x = -.25
group1.rotation.y = Math.PI / 9
group1.rotation.y = Math.PI / 9
group1.rotation.z = Math.PI / 66

newGroup.position.x = .5
const bg = new THREE.Mesh(bgGeometry,bgMaterial)
scene.add(group1,newGroup,bg)


// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2.8)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()