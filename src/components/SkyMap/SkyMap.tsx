import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';
import { useSearchParams } from 'react-router-dom';
import { stars, constellations, Star, Constellation } from '../../data/celestialData';

interface SkyMapProps {
  showGrid?: boolean;
  showConstellations?: boolean;
  showStars?: boolean;
  centerRA?: number;
  centerDec?: number;
  zoom?: number;
}

interface GlobeStarData {
  lat: number;
  lng: number;
  name: string;
  magnitude: number;
}

interface GlobeConstellationPoint {
    lat: number;
    lng: number;
}

interface GlobeConstellationData {
  points: GlobeConstellationPoint[];
}

interface GlobeISSData {
  lat: number;
  lng: number;
  altitude: number;
  label: string;
}

interface StarDetails {
  name: string;
  magnitude: number;
  position: { x: number; y: number; z: number };
}

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
}

const SkyMap: React.FC<SkyMapProps> = ({
  showGrid = true,
  showConstellations = true,
  showStars = true,
  centerRA = 0,
  centerDec = 0,
  zoom = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlightedStar, setHighlightedStar] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<StarDetails | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [issData, setIssData] = useState<ISSData | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    let fetchInterval: NodeJS.Timeout;

    const fetchISSData = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        if (isSubscribed) {
          setIssData(data);
        }
      } catch (error) {
        console.error('Error fetching ISS data:', error);
      }
    };

    fetchISSData();

    fetchInterval = setInterval(fetchISSData, 5000);

    return () => {
      isSubscribed = false;
      if (fetchInterval) {
        clearInterval(fetchInterval);
      }
    };
  }, []);

  const updateVisibility = (key: string, value: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value.toString());
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: centerDec,
        lng: centerRA,
        altitude: 2.5
      }, 1000);
    }
  }, [centerRA, centerDec]);

  const starData: GlobeStarData[] = showStars ? stars.map(star => {
    const lng = star.ra;
    const lat = star.dec;
    return {
      lat,
      lng,
      name: star.name,
      magnitude: star.magnitude
    };
  }) : [];

  const constellationData: GlobeConstellationData[] = showConstellations ? constellations.map(constellation => ({
    points: constellation.stars.map(starName => {
      const star = stars.find(s => s.name === starName);
      if (star) {
        const lng = star.ra;
        const lat = star.dec;
        return { lat, lng };
      }
      return { lat: 0, lng: 0 };
    })
  })) : [];

  const issPointData: GlobeISSData[] = issData ? [{
    lat: issData.latitude,
    lng: issData.longitude,
    altitude: 0.1,
    label: 'ISS'
  }] : [];

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full bg-gradient-to-b from-gray-900 via-blue-900 to-black"
        style={{ minHeight: '600px' }}
      >
        <Globe
          ref={globeRef}
          width={containerRef.current?.clientWidth}
          height={containerRef.current?.clientHeight}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          showGraticules={showGrid}
          labelsData={starData}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={(s: GlobeStarData) => {
            const isHighlighted = highlightedStar === s.name;
            const isSelected = selectedStar?.name === s.name;
            if (isSelected || isHighlighted) {
              return Math.max(0.7, 1.8 - s.magnitude * 0.1);
            }
            return Math.max(0.5, 1.5 - s.magnitude * 0.1);
          }}
          labelDotRadius={(s: GlobeStarData) => {
            const isHighlighted = highlightedStar === s.name;
            const isSelected = selectedStar?.name === s.name;
            if (isSelected || isHighlighted) {
              return Math.max(0.4, 1.2 - s.magnitude * 0.08);
            }
            return Math.max(0.3, 1.0 - s.magnitude * 0.08);
          }}
          labelColor={(s: GlobeStarData) => {
            const isHighlighted = highlightedStar === s.name;
            const isSelected = selectedStar?.name === s.name;
            if (isSelected) {
              return '#ffff00';
            } else if (isHighlighted) {
              return '#ffbboo';
            }
            return 'rgba(255, 255, 255, 0.8)';
          }}
          labelResolution={2}
          labelsTransitionDuration={0}
          onLabelClick={(label: GlobeStarData) => {
             setSelectedStar({
               name: label.name,
               magnitude: label.magnitude,
               position: {x:0, y:0, z:0}
             });
           }}
          onLabelHover={(label: GlobeStarData | null) => setHighlightedStar(label ? label.name : null)}
          pathsData={constellationData}
          pathPoints="points"
          pathPointLat={(p: GlobeConstellationPoint) => p.lat}
          pathPointLng={(p: GlobeConstellationPoint) => p.lng}
          pathColor={() => 'rgba(102, 102, 102, 0.5)'}
          pathStroke={1}
          pointsData={issPointData}
          pointLabel="label"
          pointLat={(d: GlobeISSData) => d.lat}
          pointLng={(d: GlobeISSData) => d.lng}
          pointColor={() => '#00ff00'}
          pointAltitude={(d: GlobeISSData) => d.altitude}
          pointRadius={0.5}
          pointResolution={12}
          pointsMerge={true}
          pointsTransitionDuration={300}
          enablePointerInteraction={true}
          onGlobeClick={() => setSelectedStar(null)}
        />
      </div>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => updateVisibility('grid', !showGrid)}
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
        <button
          className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => updateVisibility('constellations', !showConstellations)}
        >
          {showConstellations ? 'Hide Constellations' : 'Show Constellations'}
        </button>
        <button
          className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => updateVisibility('stars', !showStars)}
        >
          {showStars ? 'Hide Stars' : 'Show Stars'}
        </button>
      </div>
      {selectedStar && (
        <div className="absolute top-4 left-4 z-10 bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-xl font-bold mb-2">{selectedStar.name}</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Magnitude:</span> {selectedStar.magnitude.toFixed(2)}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
            onClick={() => setSelectedStar(null)}
          >
            Close
          </button>
        </div>
      )}
      {highlightedStar && !selectedStar && (
        <div className="absolute top-4 left-4 z-10 bg-gray-800/90 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg">
          {highlightedStar}</div>
      )}
      {issData && (
        <div className="absolute bottom-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">ISS Location</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Latitude:</span> {issData.latitude.toFixed(2)}°</p>
            <p><span className="font-semibold">Longitude:</span> {issData.longitude.toFixed(2)}°</p>
            <p><span className="font-semibold">Altitude:</span> {issData.altitude.toFixed(2)} km</p>
            <p><span className="font-semibold">Velocity:</span> {issData.velocity.toFixed(2)} km/h</p>
            <p><span className="font-semibold">Visibility:</span> {issData.visibility}</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 z-10 text-white/80 text-sm">
        <p>Click and drag to rotate</p>
        <p>Scroll to zoom</p>
        <p>Click on a star for details</p>
      </div>
    </div>
  );
};

export default SkyMap; 