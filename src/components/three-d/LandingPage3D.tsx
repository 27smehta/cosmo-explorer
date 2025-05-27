import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const LandingPage3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 10;

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#3B82F6',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    earthGroup.add(particlesMesh);

    const textureLoader = new THREE.TextureLoader();
    const earthGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
      bumpScale: 0.05,
      specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
      specular: new THREE.Color(0x333333),
      shininess: 5
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);

    const atmosphereGeometry = new THREE.SphereGeometry(2.55, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: '#3B82F6',
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphere);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI * 3/4;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x60A5FA, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2563EB, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    let isUserInteracting = false;
    let lastAutoRotateTime = Date.now();

    renderer.domElement.addEventListener('mousedown', () => {
      isUserInteracting = true;
      controls.autoRotate = false;
    });

    renderer.domElement.addEventListener('mouseup', () => {
      isUserInteracting = false;
      lastAutoRotateTime = Date.now();
    });

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      earth.rotation.y = time * 0.5;
      atmosphere.rotation.y = time * 0.5;

      if (!isUserInteracting && Date.now() - lastAutoRotateTime > 2000) {
        controls.autoRotate = true;
        earthGroup.rotation.y = time * 0.2;
      }

      pointLight1.position.x = Math.sin(time) * 5;
      pointLight1.position.z = Math.cos(time) * 5;

      pointLight2.position.x = Math.sin(time + Math.PI) * 5;
      pointLight2.position.z = Math.cos(time + Math.PI) * 5;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', () => {});
      renderer.domElement.removeEventListener('mouseup', () => {});
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(earthGroup);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue">
            Welcome to Cosmo Explorer
          </h1>
          <p className="text-2xl mb-10 text-gray-200">
            Explore the wonders of space in 3D
          </p>
          <button className="bg-gradient-to-r from-cosmos-purple to-cosmos-blue hover:from-space-700 hover:to-space-800 text-white px-10 py-4 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage3D; 