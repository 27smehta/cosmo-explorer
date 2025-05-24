import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SkyMap from '../components/SkyMap/SkyMap';
import LocationInput from '../components/SkyMap/LocationInput';

const SkyMapPage: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    date: new Date()
  });

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Interactive Sky Map</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden h-[800px]">
              <SkyMap location={location} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <LocationInput onLocationChange={setLocation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkyMapPage; 