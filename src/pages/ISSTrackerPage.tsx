import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import Layout from "../components/layout/Layout";
import ISSTracker from "./ISSTracker";
import { useState } from "react";

interface ISSLocation {
  latitude: string;
  longitude: string;
  timestamp: number;
  altitude: number;
  velocity: number;
}

const ISSTrackerPage = () => {
  const [issLocation, setIssLocation] = useState<ISSLocation | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

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
              Live ISS Tracker
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Track the International Space Station in real-time as it orbits Earth.
              Watch its current position and learn about the astronauts on board.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Globe */}
            <div className="lg:col-span-2 bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden h-[600px]">
              <ISSTracker onLocationUpdate={setIssLocation} />
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* Current Location */}
              <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-cosmos-purple" />
                  Current Location
                </h2>
                {issLocation ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Latitude:</span>
                      <span className="text-white">{parseFloat(issLocation.latitude).toFixed(2)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Longitude:</span>
                      <span className="text-white">{parseFloat(issLocation.longitude).toFixed(2)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Altitude:</span>
                      <span className="text-white">{issLocation.altitude.toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Velocity:</span>
                      <span className="text-white">{issLocation.velocity.toFixed(2)} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated:</span>
                      <span className="text-white">{formatTime(issLocation.timestamp)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400">Loading location data...</div>
                )}
              </div>

              {/* Update Info */}
              <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-cosmos-purple" />
                  Update Information
                </h2>
                <p className="text-gray-300 text-sm">
                  The ISS location is updated every 5 seconds. The data is provided by the Where The ISS At API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ISSTrackerPage; 