import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
}

const ISSTracker: React.FC = () => {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchISSData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/iss-now');
        if (!response.ok) {
          throw new Error('Failed to fetch ISS data');
        }
        const data = await response.json();
        setIssData(data);
        
        // Update URL parameters
        setSearchParams(prev => {
          prev.set('ra', data.longitude.toString());
          prev.set('dec', data.latitude.toString());
          return prev;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ISS data');
        console.error('Error fetching ISS data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchISSData();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchISSData, 5000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [setSearchParams]);

  if (loading && !issData) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!issData) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">ISS Tracker</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-300">Latitude</p>
          <p className="text-white font-mono">{issData.latitude.toFixed(4)}°</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-300">Longitude</p>
          <p className="text-white font-mono">{issData.longitude.toFixed(4)}°</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-300">Altitude</p>
          <p className="text-white font-mono">{issData.altitude.toFixed(2)} km</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-gray-300">Velocity</p>
          <p className="text-white font-mono">{issData.velocity.toFixed(2)} km/h</p>
        </div>
      </div>
      <div className="mt-4 bg-gray-700 p-3 rounded">
        <p className="text-gray-300">Visibility</p>
        <p className="text-white capitalize">{issData.visibility}</p>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Last updated: {new Date(issData.timestamp * 1000).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ISSTracker; 