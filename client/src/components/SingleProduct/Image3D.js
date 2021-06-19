import React, { useEffect, useRef } from 'react'
import oc from 'three-orbit-controls'
import * as THREE from 'three'
const OrbitControls = oc(THREE)

function Image3D({ images }) {
  const section = useRef()
  useEffect(() => {
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(75, 420 / 400, 0.1, 1000)

    var renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(420, 400)
    section.current.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.setClearColor(0xf2f2f2)
    // camera.position.set(0, 20, 100)
    controls.autoRotate = true
    controls.update()
    var geometry = new THREE.BoxGeometry(3.5, 5, 0.5)

    const light = new THREE.DirectionalLight(0x333333)
    const ambient = new THREE.AmbientLight(0xffffff)
    light.position.set(0, 0, 6)
    scene.add(light)
    scene.add(ambient)

    camera.position.z = 5
    const loader = new THREE.TextureLoader()

    const urls = [
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/wkt6vka3tqijadqkuntd.jpg',
      images[0]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/c1uckbdftljwyxhdy9lw.jpg',
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/cenbivni42pgp0hugrzo.jpg',
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/t6xeprhxbz9mhljeilpr.jpg',
      images[1]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/uvufcwicytuglkkys2sr.jpg',
      images[2]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/rj6hwym8tzvf2qlvyg89.jpg',
    ]
    const materials = urls.map((url) => {
      return new THREE.MeshLambertMaterial({
        map: loader.load(url),
      })
    })
    var cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)

    var animate = function () {
      requestAnimationFrame(animate)
      controls.update()
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }
    animate()
  }, [])
  return (
    <div
      className="border-none border-gray-200 p-0 pt-0 full-img md:p-2 md:border"
      style={{ width: 'calc(100% - 112px)', height: '400px' }}
    >
      <div ref={section}></div>
    </div>
  )
}

export default Image3D
