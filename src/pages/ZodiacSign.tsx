import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Star, Calendar } from "lucide-react";

interface ZodiacSign {
  name: string;
  element: string;
  dateRange: string;
  description: string;
  traits: string[];
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    element: "Fire",
    dateRange: "March 21 - April 19",
    description: "The first sign of the zodiac, Aries is known for its leadership and pioneering spirit.",
    traits: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic"],
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 }
  },
  {
    name: "Taurus",
    element: "Earth",
    dateRange: "April 20 - May 20",
    description: "Taurus is known for its reliability, practicality, and love for luxury.",
    traits: ["Reliable", "Patient", "Practical", "Devoted", "Responsible"],
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 }
  },
  {
    name: "Gemini",
    element: "Air",
    dateRange: "May 21 - June 20",
    description: "Gemini is known for its adaptability, curiosity, and excellent communication skills.",
    traits: ["Adaptable", "Curious", "Affectionate", "Nervous", "Inconsistent"],
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 }
  },
  {
    name: "Cancer",
    element: "Water",
    dateRange: "June 21 - July 22",
    description: "Cancer is known for its emotional depth, intuition, and nurturing nature.",
    traits: ["Tenacious", "Emotional", "Sympathetic", "Moody", "Protective"],
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 }
  },
  {
    name: "Leo",
    element: "Fire",
    dateRange: "July 23 - August 22",
    description: "Leo is known for its confidence, creativity, and natural leadership abilities.",
    traits: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 }
  },
  {
    name: "Virgo",
    element: "Earth",
    dateRange: "August 23 - September 22",
    description: "Virgo is known for its analytical mind, attention to detail, and practical approach.",
    traits: ["Analytical", "Observant", "Helpful", "Reliable", "Precise"],
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 }
  },
  {
    name: "Libra",
    element: "Air",
    dateRange: "September 23 - October 22",
    description: "Libra is known for its sense of balance, justice, and diplomatic nature.",
    traits: ["Diplomatic", "Graceful", "Fair-minded", "Social", "Idealistic"],
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 }
  },
  {
    name: "Scorpio",
    element: "Water",
    dateRange: "October 23 - November 21",
    description: "Scorpio is known for its passion, resourcefulness, and determination.",
    traits: ["Resourceful", "Brave", "Passionate", "Stubborn", "A true friend"],
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 }
  },
  {
    name: "Sagittarius",
    element: "Fire",
    dateRange: "November 22 - December 21",
    description: "Sagittarius is known for its optimism, love for freedom, and adventurous spirit.",
    traits: ["Generous", "Idealistic", "Great humor", "Impatient", "Promises more than can deliver"],
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 }
  },
  {
    name: "Capricorn",
    element: "Earth",
    dateRange: "December 22 - January 19",
    description: "Capricorn is known for its discipline, responsibility, and ambitious nature.",
    traits: ["Responsible", "Disciplined", "Self-control", "Good managers", "Know-it-all"],
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 }
  },
  {
    name: "Aquarius",
    element: "Air",
    dateRange: "January 20 - February 18",
    description: "Aquarius is known for its originality, independence, and humanitarian nature.",
    traits: ["Progressive", "Original", "Independent", "Humanitarian", "Temperamental"],
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 }
  },
  {
    name: "Pisces",
    element: "Water",
    dateRange: "February 19 - March 20",
    description: "Pisces is known for its compassion, artistic nature, and intuitive abilities.",
    traits: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"],
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 }
  }
];

const ZodiacSign = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);

  const calculateZodiacSign = (date: string) => {
    if (!date) {
      setZodiacSign(null);
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    
    const foundSign = zodiacSigns.find(sign => {
      const birthMonth = month;
      const birthDay = day;
      
      if (sign.name === "Capricorn") {
        return (birthMonth === 12 && birthDay >= 22) || (birthMonth === 1 && birthDay <= 19);
      }
      
      return (birthMonth === sign.startDate.month && birthDay >= sign.startDate.day) ||
             (birthMonth === sign.endDate.month && birthDay <= sign.endDate.day);
    });

    setZodiacSign(foundSign || null);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthDate(date);
    calculateZodiacSign(date);
  };

  return (
    <Layout>
      <section className="py-20 relative animate-fade-in">
        <div className="absolute inset-0 bg-nebula opacity-30 animate-pulse-glow"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6 animate-float">
              <Star className="h-6 w-6 text-cosmos-purple animate-twinkle" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-scale-in bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue animate-shimmer">
              Zodiac Sign Calculator
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in">
              Discover your zodiac sign and explore its unique characteristics, traits, and cosmic influences.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 animate-slide-in">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-space-700/30 border border-space-600/50 rounded-lg p-8 transform transition-all duration-300 hover:shadow-lg hover:shadow-cosmos-purple/20 animate-float">
              <div className="mb-8">
                <label htmlFor="birthdate" className="block text-lg font-medium text-white mb-4 animate-fade-in">
                  Enter Your Birth Date
                </label>
                <input
                  type="date"
                  id="birthdate"
                  value={birthDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-3 bg-space-800/50 border border-space-600/50 rounded-lg text-white focus:outline-none focus:border-cosmos-purple transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
                />
              </div>

              {zodiacSign && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-6 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-16 h-16 bg-space-800/50 rounded-full flex items-center justify-center animate-float">
                      <span className="text-2xl">{zodiacSign.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cosmos-purple to-cosmos-blue animate-shimmer">
                        {zodiacSign.name}
                      </h2>
                      <p className="text-cosmos-purple">{zodiacSign.dateRange}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="transform transition-all duration-300 hover:translate-x-2">
                      <h3 className="text-lg font-semibold text-white mb-2 animate-fade-in">Element</h3>
                      <p className="text-gray-300 animate-fade-in">{zodiacSign.element}</p>
                    </div>

                    <div className="transform transition-all duration-300 hover:translate-x-2">
                      <h3 className="text-lg font-semibold text-white mb-2 animate-fade-in">Description</h3>
                      <p className="text-gray-300 animate-fade-in">{zodiacSign.description}</p>
                    </div>

                    <div className="transform transition-all duration-300 hover:translate-x-2">
                      <h3 className="text-lg font-semibold text-white mb-2 animate-fade-in">Traits</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {zodiacSign.traits.map((trait, index) => (
                          <li key={index} className="animate-fade-in transform transition-all duration-300 hover:translate-x-2" style={{ animationDelay: `${index * 100}ms` }}>
                            {trait}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ZodiacSign; 