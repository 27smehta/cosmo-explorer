import { useState } from 'react';
import { careerPaths, CareerPath } from '../data/careerPaths';
import Layout from '../components/layout/Layout';
import { GraduationCap } from 'lucide-react';

export default function CareerExplorer() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <GraduationCap className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Space Career Path Explorer
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Explore various career paths in the space industry. Learn about required education, skills, salary ranges, and resources to help you start your journey in space exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-space-700/50 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-cosmos-purple">Career Paths</h2>
              <div className="space-y-4">
                {careerPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedPath?.id === path.id
                        ? 'bg-cosmos-purple text-white'
                        : 'bg-space-700/50 hover:bg-space-700'
                    }`}
                  >
                    <h3 className="font-medium">{path.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">{path.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              {selectedPath ? (
                <div className="bg-space-700/50 rounded-lg p-6 backdrop-blur-sm">
                  <h2 className="text-3xl font-bold mb-6 text-cosmos-purple">{selectedPath.title}</h2>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold mb-3 text-cosmos-purple">Education</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedPath.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-3 text-cosmos-purple">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.skills.map((skill, index) => (
                          <span key={index} className="bg-cosmos-purple/20 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-3 text-cosmos-purple">Salary Ranges</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-space-700/50 p-4 rounded-lg">
                          <h4 className="font-medium">Entry Level</h4>
                          <p className="text-cosmos-purple">{selectedPath.salary.entry}</p>
                        </div>
                        <div className="bg-space-700/50 p-4 rounded-lg">
                          <h4 className="font-medium">Mid Level</h4>
                          <p className="text-cosmos-purple">{selectedPath.salary.mid}</p>
                        </div>
                        <div className="bg-space-700/50 p-4 rounded-lg">
                          <h4 className="font-medium">Senior Level</h4>
                          <p className="text-cosmos-purple">{selectedPath.salary.senior}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-3 text-cosmos-purple">Top Companies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.companies.map((company, index) => (
                          <span key={index} className="bg-space-700/50 px-3 py-1 rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold mb-3 text-cosmos-purple">Learning Resources</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Courses</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedPath.resources.courses.map((course, index) => (
                              <li key={index}>{course}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Certifications</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedPath.resources.certifications.map((cert, index) => (
                              <li key={index}>{cert}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Recommended Books</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedPath.resources.books.map((book, index) => (
                              <li key={index}>{book}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="bg-space-700/50 rounded-lg p-6 backdrop-blur-sm text-center">
                  <p className="text-xl text-gray-300">Select a career path to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 