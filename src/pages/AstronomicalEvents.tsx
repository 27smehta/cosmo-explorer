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
    const events: AstronomicalEvent[] = [];
    
    if (apiData.data && apiData.data.positions) {
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

    const knownEvents: AstronomicalEvent[] = [
      {
        id: "1",
        name: "Eta Aquariid Meteor Shower",
        date: "2025-05-05",
        type: "meteor-shower",
        description: "The Eta Aquariids are best viewed before dawn, especially from the Southern Hemisphere, but visible worldwide. Peak rates can reach up to 50–60 meteors per hour under ideal conditions, with the radiant in Aquarius. The Moon will be 72% illuminated but will set after midnight, providing dark skies for the peak hours.",
        visibility: "Best viewed from Southern Hemisphere before dawn",
        importance: "high",
        coordinates: [
          { lat: -30, lng: 0 },
          { lat: -40, lng: 20 },
          { lat: -50, lng: -20 }
        ]
      },
      {
        id: "2",
        name: "Arietid Meteor Shower (Daytime)",
        date: "2025-06-07",
        type: "meteor-shower",
        description: "The Arietids are the most active daytime meteor shower, peaking around June 7. Best chance to see meteors is in the dark hour before dawn, looking east. Rates can be high (up to 60 meteors per hour or more), but visibility is limited due to daylight.",
        visibility: "Best viewed in dark hour before dawn, looking east",
        importance: "medium",
        coordinates: [
          { lat: 30, lng: 0 },
          { lat: 40, lng: 20 },
          { lat: 50, lng: -20 }
        ]
      },
      {
        id: "3",
        name: "Alpha Capricornids & Southern Delta Aquarids",
        date: "2025-07-29",
        type: "meteor-shower",
        description: "These two minor showers overlap, producing a combined rate of about 10–15 meteors per hour. Best viewed after midnight from both hemispheres.",
        visibility: "Best viewed after midnight from both hemispheres",
        importance: "medium",
        coordinates: [
          { lat: 0, lng: 0 },
          { lat: 20, lng: 20 },
          { lat: -20, lng: -20 }
        ]
      },
      {
        id: "4",
        name: "Perseid Meteor Shower",
        date: "2025-08-12",
        type: "meteor-shower",
        description: "One of the most popular showers, best viewed after midnight, especially in the Northern Hemisphere. Up to 90–100 meteors per hour under ideal conditions, but 2025 will have a bright, nearly full Moon, which may reduce visibility. The radiant is in Perseus, high in the sky before dawn.",
        visibility: "Best viewed after midnight from Northern Hemisphere",
        importance: "high",
        coordinates: [
          { lat: 40, lng: -90 },
          { lat: 50, lng: -80 },
          { lat: 60, lng: -70 }
        ]
      },
      {
        id: "5",
        name: "Geminid Meteor Shower",
        date: "2025-12-13",
        type: "meteor-shower",
        description: "The Geminids are among the most spectacular meteor showers, producing up to 120 meteors per hour under dark skies. Best viewed after midnight from both hemispheres. The Moon will not significantly interfere in 2025, offering excellent viewing conditions.",
        visibility: "Best viewed after midnight from both hemispheres",
        importance: "high",
        coordinates: [
          { lat: 30, lng: 0 },
          { lat: 40, lng: 20 },
          { lat: 50, lng: -20 }
        ]
      },
      {
        id: "6",
        name: "Ursid Meteor Shower",
        date: "2025-12-22",
        type: "meteor-shower",
        description: "The Ursids are a minor shower, peaking around December 22–23. Best viewed after midnight in the Northern Hemisphere, with rates of 5–10 meteors per hour. The Moon will be near new, so dark skies are expected.",
        visibility: "Best viewed after midnight from Northern Hemisphere",
        importance: "medium",
        coordinates: [
          { lat: 40, lng: -90 },
          { lat: 50, lng: -80 },
          { lat: 60, lng: -70 }
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
      const { lat, lng } = event.coordinates[0];
      globeRef.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
    }
  };

  return (
    <Layout>
      <section className="py-20 relative animate-fade-in">
        <div className="absolute inset-0 bg-nebula opacity-30 animate-pulse-glow"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6 animate-float">
              <Calendar className="h-6 w-6 text-cosmos-purple animate-twinkle" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-scale-in bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue animate-shimmer">
              Astronomical Events 2025
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in">
              Explore the celestial events happening throughout the year. From meteor showers to eclipses,
              discover the wonders of our universe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 animate-slide-in">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {["all", "meteor-shower", "eclipse", "planetary-alignment"].map((filterType, index) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                  filter === filterType
                    ? "bg-cosmos-purple text-white shadow-lg shadow-cosmos-purple/20"
                    : "bg-space-700/50 text-gray-300 hover:bg-space-600"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {filterType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </button>
            ))}
          </div>

          <div className="mb-12 h-[500px] bg-space-800/50 rounded-lg overflow-hidden transform transition-all duration-500 hover:shadow-lg hover:shadow-cosmos-purple/20 animate-float">
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

          {loading && (
            <div className="text-center py-8 animate-fade-in">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmos-purple mx-auto"></div>
              <p className="text-gray-300 mt-4 animate-pulse">Loading astronomical events...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-red-400 animate-pulse">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => filter === "all" || event.type === filter)
                .map((event, index) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="bg-space-700/30 border border-space-600/50 rounded-lg p-6 hover:border-cosmos-purple/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-cosmos-purple/20 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="animate-float group-hover:animate-none">
                          {getEventIcon(event.type)}
                        </div>
                        <h3 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue animate-shimmer">
                          {event.name}
                        </h3>
                      </div>
                      <span className={`text-sm font-medium ${getImportanceColor(event.importance)} animate-pulse-glow`}>
                        {event.importance.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-cosmos-purple font-medium mb-4 animate-fade-in">{event.date}</p>
                    <p className="text-gray-300 mb-4 line-clamp-2 animate-fade-in">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-400 animate-fade-in">
                      <span className="mr-2">Visibility:</span>
                      <span>{event.visibility}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {selectedEvent && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-space-800 border border-space-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-scale-in">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="animate-float">
                        {getEventIcon(selectedEvent.type)}
                      </div>
                      <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue animate-shimmer">
                        {selectedEvent.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Date", content: selectedEvent.date },
                      { title: "Description", content: selectedEvent.description },
                      { title: "Visibility", content: selectedEvent.visibility },
                      { title: "Importance", content: selectedEvent.importance.toUpperCase() }
                    ].map((section, index) => (
                      <div key={section.title} className="animate-fade-in transform transition-all duration-300 hover:translate-x-2" style={{ animationDelay: `${index * 100}ms` }}>
                        <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
                        <p className={`${section.title === "Importance" ? getImportanceColor(selectedEvent.importance) : "text-gray-300"}`}>
                          {section.content}
                        </p>
                      </div>
                    ))}

                    {selectedEvent.coordinates && (
                      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                        <h3 className="text-lg font-semibold text-white mb-2">Best Viewing Locations</h3>
                        <div className="h-[300px] bg-space-700/30 rounded-lg overflow-hidden transform transition-all duration-500 hover:shadow-lg hover:shadow-cosmos-purple/20 animate-float">
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