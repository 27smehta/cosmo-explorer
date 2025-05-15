import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ISSLocation {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

const ISSTracker = () => {
  const [location, setLocation] = useState<ISSLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const issMarkerRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const fetchISSLocation = async () => {
      try {
        const response = await fetch('/api/iss-now');
        const data = await response.json();
        setLocation(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ISS location');
        setLoading(false);
      }
    };

    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !location) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
    const earthTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    const issGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const issMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const issMarker = new THREE.Mesh(issGeometry, issMaterial);
    scene.add(issMarker);
    issMarkerRef.current = issMarker;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    camera.position.z = 15;

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [location]);

  useEffect(() => {
    if (!location || !earthRef.current || !issMarkerRef.current) return;

    const { latitude, longitude } = location;
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -(5.1 * Math.sin(phi) * Math.cos(theta));
    const y = 5.1 * Math.cos(phi);
    const z = 5.1 * Math.sin(phi) * Math.sin(theta);

    issMarkerRef.current.position.set(x, y, z);
  }, [location]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-cosmos-purple hover:text-cosmos-blue transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ISS Tracker
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Track the International Space Station in real-time as it orbits Earth. The red dot shows the current position of the ISS.
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
            <div className="relative h-[600px]">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cosmos-purple"></div>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div ref={containerRef} className="w-full h-full" />
              )}
            </div>

            {location && (
              <div className="p-6 border-t border-space-700/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Latitude</h3>
                    <p className="text-lg text-white">{location.latitude.toFixed(4)}°</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Longitude</h3>
                    <p className="text-lg text-white">{location.longitude.toFixed(4)}°</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Altitude</h3>
                    <p className="text-lg text-white">{location.altitude.toFixed(0)} km</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Velocity</h3>
                    <p className="text-lg text-white">{location.velocity.toFixed(0)} km/h</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ISSTracker;