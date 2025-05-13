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
      
      // Handle Capricorn's date range which spans across years
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
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Star className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Zodiac Sign Calculator
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover your zodiac sign and learn about its unique characteristics.
              Enter your date of birth below to find out more!
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-8">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-full max-w-md">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter your date of birth
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 bg-space-700/50 border border-space-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmos-purple"
                />
              </div>
            </div>

            {/* Results Section */}
            {zodiacSign && (
              <div className="bg-space-700/30 border border-space-600/50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{zodiacSign.name}</h2>
                  <p className="text-cosmos-purple font-medium">{zodiacSign.dateRange}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Element</h3>
                    <p className="text-gray-300">{zodiacSign.element}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300">{zodiacSign.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Key Traits</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {zodiacSign.traits.map((trait, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-cosmos-purple rounded-full mr-2"></span>
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
      </section>
    </Layout>
  );
};

export default ZodiacSign; 