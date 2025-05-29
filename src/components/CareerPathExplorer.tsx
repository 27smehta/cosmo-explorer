import React, { useState } from 'react';
import { careerPaths, CareerPath } from '../data/careerPaths';
import { motion } from 'framer-motion';

const CareerPathExplorer: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = careerPaths.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Space Career Path Explorer
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search career paths..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career List */}
          <div className="space-y-4">
            {filteredCareers.map((career) => (
              <motion.div
                key={career.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  selectedCareer?.id === career.id
                    ? 'bg-blue-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCareer(career)}
              >
                <h2 className="text-xl font-semibold mb-2">{career.title}</h2>
                <p className="text-gray-300">{career.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Career Details */}
          {selectedCareer && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">{selectedCareer.title}</h2>
              
              <div className="space-y-6">
                {/* Education */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Education</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-gray-300">Required</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {selectedCareer.education.required.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">Recommended</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {selectedCareer.education.recommended.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Responsibilities */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-400">
                    {selectedCareer.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </section>

                {/* Salary */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Salary Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-300">Entry Level</h4>
                      <p className="text-gray-400">{selectedCareer.salary.entry}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-300">Experienced</h4>
                      <p className="text-gray-400">{selectedCareer.salary.experienced}</p>
                    </div>
                  </div>
                </section>

                {/* Resources */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Resources</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-300">Courses</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {selectedCareer.resources.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">Certifications</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {selectedCareer.resources.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">Organizations</h4>
                      <ul className="list-disc list-inside text-gray-400">
                        {selectedCareer.resources.organizations.map((org, index) => (
                          <li key={index}>{org}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Companies */}
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">Top Employers</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.companies.map((company, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathExplorer; 