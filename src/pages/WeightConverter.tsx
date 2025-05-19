import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Scale, ArrowRight } from "lucide-react";

interface Planet {
  name: string;
  gravity: number; // relative to Earth's gravity
  description: string;
}

const planets: Planet[] = [
  {
    name: "Mercury",
    gravity: 0.38,
    description: "The smallest and innermost planet in the Solar System"
  },
  {
    name: "Venus",
    gravity: 0.91,
    description: "The second planet from the Sun, often called Earth's sister planet"
  },
  {
    name: "Earth",
    gravity: 1,
    description: "Our home planet, the only known planet to harbor life"
  },
  {
    name: "Mars",
    gravity: 0.38,
    description: "The fourth planet from the Sun, known as the Red Planet"
  },
  {
    name: "Jupiter",
    gravity: 2.34,
    description: "The largest planet in our Solar System"
  },
  {
    name: "Saturn",
    gravity: 0.93,
    description: "Known for its prominent ring system"
  },
  {
    name: "Uranus",
    gravity: 0.92,
    description: "The first planet discovered with a telescope"
  },
  {
    name: "Neptune",
    gravity: 1.12,
    description: "The farthest known planet from the Sun"
  }
];

const WeightConverter = () => {
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [convertedWeights, setConvertedWeights] = useState<{ [key: string]: number }>({});

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
      calculateWeights(value, unit);
    }
  };

  const handleUnitChange = (newUnit: "kg" | "lbs") => {
    setUnit(newUnit);
    calculateWeights(weight, newUnit);
  };

  const calculateWeights = (inputWeight: string, inputUnit: "kg" | "lbs") => {
    if (!inputWeight) {
      setConvertedWeights({});
      return;
    }

    const weightInKg = inputUnit === "lbs" ? parseFloat(inputWeight) * 0.453592 : parseFloat(inputWeight);
    const newWeights: { [key: string]: number } = {};

    planets.forEach(planet => {
      const weightOnPlanet = weightInKg * planet.gravity;
      newWeights[planet.name] = weightOnPlanet;
    });

    setConvertedWeights(newWeights);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Scale className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Planetary Weight Converter
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover how much you would weigh on different planets in our solar system.
              Enter your weight below to see the results!
            </p>
          </div>
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="Enter your weight"
                  className="w-full px-4 py-2 bg-space-700/50 border border-space-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmos-purple"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUnitChange("kg")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    unit === "kg"
                      ? "bg-cosmos-purple text-white"
                      : "bg-space-700/50 text-gray-300 hover:bg-space-600"
                  }`}
                >
                  kg
                </button>
                <button
                  onClick={() => handleUnitChange("lbs")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    unit === "lbs"
                      ? "bg-cosmos-purple text-white"
                      : "bg-space-700/50 text-gray-300 hover:bg-space-600"
                  }`}
                >
                  lbs
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planets.map((planet) => (
                <div
                  key={planet.name}
                  className="bg-space-700/30 border border-space-600/50 rounded-lg p-6 hover:border-cosmos-purple/50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{planet.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{planet.description}</p>
                  {weight && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Your weight:</span>
                      <span className="text-cosmos-purple font-bold">
                        {convertedWeights[planet.name]?.toFixed(2)} {unit}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WeightConverter; 