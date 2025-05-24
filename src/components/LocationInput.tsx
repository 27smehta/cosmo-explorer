import React, { useState } from 'react';

interface LocationInputProps {
  onLocationChange: (lat: number, lon: number) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGetLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude.toFixed(6));
        setLon(longitude.toFixed(6));
        onLocationChange(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Please allow location access to use this feature');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('An unknown error occurred');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      setError('Please enter valid coordinates');
      return;
    }

    if (latNum < -90 || latNum > 90) {
      setError('Latitude must be between -90 and 90 degrees');
      return;
    }

    if (lonNum < -180 || lonNum > 180) {
      setError('Longitude must be between -180 and 180 degrees');
      return;
    }

    onLocationChange(latNum, lonNum);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="lat" className="text-sm font-medium text-gray-300">
            Latitude (-90 to 90)
          </label>
          <input
            type="number"
            id="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            step="any"
            placeholder="Enter latitude"
            className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="lon" className="text-sm font-medium text-gray-300">
            Longitude (-180 to 180)
          </label>
          <input
            type="number"
            id="lon"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            step="any"
            placeholder="Enter longitude"
            className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Set Location
          </button>
          <button
            type="button"
            onClick={handleGetLocation}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Use Current Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationInput; 