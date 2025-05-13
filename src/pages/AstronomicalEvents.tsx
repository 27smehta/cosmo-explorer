import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import { Calendar, Star, Moon, Sun, Sparkles, ArrowRight, Globe } from "lucide-react";
import axios from "axios";
import GlobeGL from "react-globe.gl";

interface AstronomicalEvent {
  id: string;
  name: string;
  date: string;
  type: "meteor-shower" | "eclipse" | "planetary-alignment" | "other";
  description: string;
  visibility: string;
  importance: "high" | "medium" | "low";
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  }[];
}

const ASTRONOMY_API_CREDENTIALS = {
  applicationId: "85705811-768e-4f5f-8fa2-6c9724b883a7",
  applicationSecret: "a1822283ca031430a19d684a5097aee3934e482aa2dc50aa658eef7cade1eadc96e749c6009af5335e9b7431e527400b8721191d2661b20f95825c98ba1988aa29a6e0c6cb0b10f90b2af49f28f440c67381590c16f54623fc72cf6c3ff7ce06240c42d5d72c6fe0e58592e2a254fb46"
};

const AstronomicalEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<AstronomicalEvent | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const globeRef = useRef<any>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.astronomyapi.com/api/v2/bodies/positions', {
          params: {
            latitude: 0,
            longitude: 0,
            elevation: 0,
            from_date: new Date().toISOString().split('T')[0],
            to_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            time: '12:00:00',
          },
          headers: {
            'Authorization': `Basic ${btoa(`${ASTRONOMY_API_CREDENTIALS.applicationId}:${ASTRONOMY_API_CREDENTIALS.applicationSecret}`)}`
          }
        });

        // Transform API data into our event format
        const transformedEvents = transformApiData(response.data);
        setEvents(transformedEvents);
      } catch (err) {
        setError('Failed to fetch astronomical events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const transformApiData = (apiData: any): AstronomicalEvent[] => {
    // Transform the API response into our event format
    const events: AstronomicalEvent[] = [];
    
    if (apiData.data && apiData.data.positions) {
      // Process planetary positions
      Object.entries(apiData.data.positions).forEach(([planet, positions]: [string, any]) => {
        if (positions.length > 0) {
          const position = positions[0];
          events.push({
            id: `planet-${planet}`,
            name: `${planet.charAt(0).toUpperCase() + planet.slice(1)} Position`,
            date: position.date,
            type: "planetary-alignment",
            description: `Current position of ${planet} in the night sky.`,
            visibility: "Visible worldwide",
            importance: "medium",
            coordinates: [{
              lat: position.latitude,
              lng: position.longitude
            }]
          });
        }
      });
    }

    // Add known upcoming events
    const knownEvents: AstronomicalEvent[] = [
      {
        id: "1",
        name: "Lyrid Meteor Shower",
        date: "2024-04-22",
        type: "meteor-shower",
        description: "The Lyrids are one of the oldest known meteor showers, with records dating back 2,700 years.",
        visibility: "Best viewed in the Northern Hemisphere after midnight",
        importance: "high",
        coordinates: [
          { lat: 40, lng: -90 },
          { lat: 50, lng: -80 },
          { lat: 60, lng: -70 }
        ]
      },
      {
        id: "2",
        name: "Total Solar Eclipse",
        date: "2024-04-08",
        type: "eclipse",
        description: "A total solar eclipse will be visible across North America.",
        visibility: "Visible in North America",
        importance: "high",
        coordinates: [
          { lat: 30, lng: -100 },
          { lat: 40, lng: -90 },
          { lat: 50, lng: -80 }
        ]
      }
    ];

    return [...events, ...knownEvents];
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meteor-shower":
        return <Sparkles className="h-5 w-5" />;
      case "eclipse":
        return <Moon className="h-5 w-5" />;
      case "planetary-alignment":
        return <Star className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const handleEventClick = (event: AstronomicalEvent) => {
    setSelectedEvent(event);
    if (event.coordinates && globeRef.current) {
      // Center the globe on the first coordinate of the event
      const { lat, lng } = event.coordinates[0];
      globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Calendar className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upcoming Astronomical Events
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Explore the celestial calendar and discover upcoming astronomical events.
              From meteor showers to eclipses, stay informed about the wonders of the cosmos.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "all"
                  ? "bg-cosmos-purple text-white"
                  : "bg-space-700/50 text-gray-300 hover:bg-space-600"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter("meteor-shower")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "meteor-shower"
                  ? "bg-cosmos-purple text-white"
                  : "bg-space-700/50 text-gray-300 hover:bg-space-600"
              }`}
            >
              Meteor Showers
            </button>
            <button
              onClick={() => setFilter("eclipse")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "eclipse"
                  ? "bg-cosmos-purple text-white"
                  : "bg-space-700/50 text-gray-300 hover:bg-space-600"
              }`}
            >
              Eclipses
            </button>
            <button
              onClick={() => setFilter("planetary-alignment")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "planetary-alignment"
                  ? "bg-cosmos-purple text-white"
                  : "bg-space-700/50 text-gray-300 hover:bg-space-600"
              }`}
            >
              Planetary Alignments
            </button>
          </div>

          {/* Interactive Globe */}
          <div className="mb-12 h-[500px] bg-space-800/50 rounded-lg overflow-hidden">
            <GlobeGL
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              pointsData={selectedEvent?.coordinates || []}
              pointColor={() => '#ff0000'}
              pointRadius={0.5}
              pointAltitude={0.1}
              atmosphereColor="#ffffff"
              atmosphereAltitude={0.1}
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmos-purple mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading astronomical events...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => filter === "all" || event.type === filter)
                .map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="bg-space-700/30 border border-space-600/50 rounded-lg p-6 hover:border-cosmos-purple/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <h3 className="text-xl font-bold text-white">{event.name}</h3>
                      </div>
                      <span className={`text-sm font-medium ${getImportanceColor(event.importance)}`}>
                        {event.importance.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-cosmos-purple font-medium mb-4">{event.date}</p>
                    <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">Visibility:</span>
                      <span>{event.visibility}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Event Details Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-space-800 border border-space-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {getEventIcon(selectedEvent.type)}
                      <h2 className="text-2xl font-bold text-white">{selectedEvent.name}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Date</h3>
                      <p className="text-cosmos-purple">{selectedEvent.date}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                      <p className="text-gray-300">{selectedEvent.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Visibility</h3>
                      <p className="text-gray-300">{selectedEvent.visibility}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Importance</h3>
                      <p className={`${getImportanceColor(selectedEvent.importance)}`}>
                        {selectedEvent.importance.toUpperCase()}
                      </p>
                    </div>

                    {selectedEvent.coordinates && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Best Viewing Locations</h3>
                        <div className="h-[300px] bg-space-700/30 rounded-lg overflow-hidden">
                          <GlobeGL
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                            pointsData={selectedEvent.coordinates}
                            pointColor={() => '#ff0000'}
                            pointRadius={0.5}
                            pointAltitude={0.1}
                            atmosphereColor="#ffffff"
                            atmosphereAltitude={0.1}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AstronomicalEvents; 