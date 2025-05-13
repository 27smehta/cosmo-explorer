import { is } from 'date-fns/locale';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ISSLocation {
  latitude: string;
  longitude: string;
  timestamp: number;
  altitude: number;
  velocity: number;
}

interface ISSTrackerProps {
  onLocationUpdate: (location: ISSLocation) => void;
}

declare global {
  interface Window {
    [key: string]: (data: any) => void;
  }
}

const ISSTracker = ({ onLocationUpdate }: ISSTrackerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const issMarkerRef = useRef<THREE.Mesh | null>(null);
  const [issLocation, setIssLocation] = useState<ISSLocation | null>(null);

  // Fetch ISS location
  const fetchISSLocation = async () => {
    try {
      const response = await fetch('/api/iss-now');
      const data = await response.json();
      
      const location: ISSLocation = {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        timestamp: Math.floor(Date.now() / 1000),
        altitude: data.altitude,
        velocity: data.velocity
      };
      
      setIssLocation(location);
      onLocationUpdate(location);
      if (issMarkerRef.current) {
        updateISSMarker(location);
      }
    } catch (error) {
      console.error('Error fetching ISS location:', error);
    }
  };

  // Update ISS marker position
  const updateISSMarker = (location: ISSLocation) => {
    if (!issMarkerRef.current) return;

    const phi = (90 - parseFloat(location.latitude)) * (Math.PI / 180);
    const theta = (parseFloat(location.longitude) + 180) * (Math.PI / 180);

    const x = -5 * Math.sin(phi) * Math.cos(theta);
    const y = 5 * Math.cos(phi);
    const z = 5 * Math.sin(phi) * Math.sin(theta);

    issMarkerRef.current.position.set(x, y, z);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
    const earthTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create ISS marker
    const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const issMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    issMarkerRef.current = issMarker;
    scene.add(issMarker);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 20;

    // Position camera
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Initial fetch and set up interval
    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(earth);
      scene.remove(issMarker);
      renderer.dispose();
    };
  }, [onLocationUpdate]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }} 
    />
  );
};

export default ISSTracker; 













is