import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

interface LocationInputProps {
  onLocationChange: (location: { latitude: number; longitude: number; date: Date }) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    date: new Date()
  });

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLocation = {
      ...location,
      [name]: parseFloat(value)
    };
    setLocation(newLocation);
    onLocationChange(newLocation);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    const newLocation = {
      ...location,
      date: newDate
    };
    setLocation(newLocation);
    onLocationChange(newLocation);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            date: new Date()
          };
          setLocation(newLocation);
          onLocationChange(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Location Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Latitude
          </label>
          <div className="relative">
            <input
              type="number"
              name="latitude"
              value={location.latitude}
              onChange={handleLocationChange}
              className="w-full bg-space-700 border border-space-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cosmos-purple"
              placeholder="Enter latitude (-90 to 90)"
              min="-90"
              max="90"
              step="0.000001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Longitude
          </label>
          <div className="relative">
            <input
              type="number"
              name="longitude"
              value={location.longitude}
              onChange={handleLocationChange}
              className="w-full bg-space-700 border border-space-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cosmos-purple"
              placeholder="Enter longitude (-180 to 180)"
              min="-180"
              max="180"
              step="0.000001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Date and Time
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={location.date.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              className="w-full bg-space-700 border border-space-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cosmos-purple"
            />
          </div>
        </div>

        <button
          onClick={handleUseCurrentLocation}
          className="w-full flex items-center justify-center space-x-2 bg-cosmos-purple hover:bg-cosmos-blue text-white px-4 py-2 rounded-md transition-colors"
        >
          <MapPin className="h-4 w-4" />
          <span>Use Current Location</span>
        </button>
      </div>
    </div>
  );
};

export default LocationInput; 