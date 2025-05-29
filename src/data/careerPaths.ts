export interface CareerPath {
  id: string;
  title: string;
  description: string;
  education: {
    required: string[];
    recommended: string[];
  };
  skills: string[];
  responsibilities: string[];
  salary: {
    entry: string;
    experienced: string;
  };
  resources: {
    courses: string[];
    certifications: string[];
    organizations: string[];
  };
  companies: string[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    description: "Design and develop aircraft, spacecraft, satellites, and missiles. Work on the cutting edge of technology to advance space exploration.",
    education: {
      required: [
        "Bachelor's degree in Aerospace Engineering or related field",
        "Master's degree (recommended for advancement)"
      ],
      recommended: [
        "PhD for research positions",
        "Specialized certifications in specific aerospace systems"
      ]
    },
    skills: [
      "Advanced mathematics",
      "Computer-aided design (CAD)",
      "Systems engineering",
      "Project management",
      "Problem-solving",
      "Technical writing"
    ],
    responsibilities: [
      "Design and test aircraft and spacecraft",
      "Develop new technologies for space exploration",
      "Analyze and solve complex engineering problems",
      "Collaborate with interdisciplinary teams",
      "Ensure compliance with safety regulations"
    ],
    salary: {
      entry: "$70,000 - $90,000",
      experienced: "$120,000 - $150,000+"
    },
    resources: {
      courses: [
        "MIT OpenCourseWare - Aerospace Engineering",
        "Coursera - Introduction to Aerospace Engineering",
        "edX - Space Systems Engineering"
      ],
      certifications: [
        "Professional Engineer (PE) License",
        "Project Management Professional (PMP)",
        "Systems Engineering Professional Certification"
      ],
      organizations: [
        "American Institute of Aeronautics and Astronautics (AIAA)",
        "Society of Aerospace Engineers",
        "International Astronautical Federation"
      ]
    },
    companies: [
      "NASA",
      "SpaceX",
      "Boeing",
      "Lockheed Martin",
      "Blue Origin",
      "Northrop Grumman"
    ]
  },
  {
    id: "astronomer",
    title: "Astronomer",
    description: "Study celestial objects and phenomena to understand the universe. Conduct research and make discoveries about space, stars, planets, and galaxies.",
    education: {
      required: [
        "Bachelor's degree in Astronomy, Physics, or related field",
        "PhD in Astronomy or Astrophysics"
      ],
      recommended: [
        "Postdoctoral research experience",
        "Specialized training in specific astronomical instruments"
      ]
    },
    skills: [
      "Advanced mathematics",
      "Data analysis",
      "Computer programming",
      "Scientific research methods",
      "Technical writing",
      "Observational techniques"
    ],
    responsibilities: [
      "Conduct astronomical research",
      "Analyze data from telescopes and satellites",
      "Develop theoretical models",
      "Publish research findings",
      "Collaborate with international research teams"
    ],
    salary: {
      entry: "$60,000 - $80,000",
      experienced: "$100,000 - $150,000+"
    },
    resources: {
      courses: [
        "HarvardX - Introduction to Astrophysics",
        "Coursera - Astronomy: Exploring Time and Space",
        "edX - The Science of the Solar System"
      ],
      certifications: [
        "Professional certification in specific astronomical instruments",
        "Data analysis certifications"
      ],
      organizations: [
        "American Astronomical Society",
        "International Astronomical Union",
        "Royal Astronomical Society"
      ]
    },
    companies: [
      "NASA",
      "European Space Agency",
      "National Radio Astronomy Observatory",
      "Space Telescope Science Institute",
      "Major research universities"
    ]
  },
  {
    id: "space-scientist",
    title: "Space Scientist",
    description: "Conduct research on space phenomena, planetary science, and astrophysics. Contribute to our understanding of the universe and space exploration.",
    education: {
      required: [
        "Bachelor's degree in Physics, Astronomy, or related field",
        "PhD in Space Science or related field"
      ],
      recommended: [
        "Postdoctoral research experience",
        "Specialized training in space instrumentation"
      ]
    },
    skills: [
      "Research methodology",
      "Data analysis",
      "Scientific computing",
      "Technical writing",
      "Problem-solving",
      "Team collaboration"
    ],
    responsibilities: [
      "Conduct space research",
      "Analyze space data",
      "Publish research papers",
      "Collaborate with international teams",
      "Develop new research methods"
    ],
    salary: {
      entry: "$60,000 - $80,000",
      experienced: "$110,000 - $160,000+"
    },
    resources: {
      courses: [
        "Space Science and Technology",
        "Planetary Science",
        "Astrophysics Research Methods"
      ],
      certifications: [
        "Research Methodology",
        "Data Analysis",
        "Scientific Computing Certification"
      ],
      organizations: [
        "American Geophysical Union",
        "Planetary Society",
        "Space Science Institute"
      ]
    },
    companies: [
      "NASA",
      "ESA",
      "SETI Institute",
      "Space Science Institute",
      "Universities"
    ]
  },
  {
    id: "space-software-engineer",
    title: "Space Software Engineer",
    description: "Develop software systems for space missions, satellites, and ground control systems. Create reliable and efficient software for space applications.",
    education: {
      required: [
        "Bachelor's degree in Computer Science or Software Engineering",
        "Experience with space systems"
      ],
      recommended: [
        "Master's degree in Space Systems Engineering",
        "Certifications in space software development"
      ]
    },
    skills: [
      "Software development",
      "Systems programming",
      "Real-time systems",
      "Testing & Verification",
      "Space protocols",
      "Embedded systems"
    ],
    responsibilities: [
      "Develop space mission software",
      "Create ground control systems",
      "Implement safety-critical systems",
      "Test and verify software",
      "Maintain existing systems"
    ],
    salary: {
      entry: "$80,000 - $100,000",
      experienced: "$140,000 - $200,000+"
    },
    resources: {
      courses: [
        "Space Systems Software Engineering",
        "Real-time Systems Development",
        "Space Mission Software"
      ],
      certifications: [
        "Space Systems Certification",
        "Software Engineering Certification",
        "Safety-Critical Systems"
      ],
      organizations: [
        "Space Software Engineering Association",
        "International Space Software Association",
        "Space Systems Engineering Society"
      ]
    },
    companies: [
      "SpaceX",
      "NASA JPL",
      "Maxar Technologies",
      "Planet Labs",
      "Rocket Lab"
    ]
  },
  {
    id: "space-medicine",
    title: "Space Medicine Specialist",
    description: "Study and address the health challenges of space travel. Develop medical protocols and research human adaptation to space environments.",
    education: {
      required: [
        "Medical degree (MD or DO)",
        "Residency in Aerospace Medicine"
      ],
      recommended: [
        "Fellowship in Space Medicine",
        "Research experience in space physiology"
      ]
    },
    skills: [
      "Medical expertise",
      "Research methodology",
      "Space physiology",
      "Emergency medicine",
      "Clinical trials",
      "Team leadership"
    ],
    responsibilities: [
      "Develop space medical protocols",
      "Conduct space health research",
      "Monitor astronaut health",
      "Train medical teams",
      "Implement safety measures"
    ],
    salary: {
      entry: "$90,000 - $120,000",
      experienced: "$160,000 - $220,000+"
    },
    resources: {
      courses: [
        "Space Medicine Fundamentals",
        "Aerospace Physiology",
        "Space Health Research"
      ],
      certifications: [
        "Aerospace Medicine Certification",
        "Space Medicine Specialist",
        "Research Ethics Certification"
      ],
      organizations: [
        "Aerospace Medical Association",
        "Space Medicine Association",
        "International Space Medicine Society"
      ]
    },
    companies: [
      "NASA Johnson Space Center",
      "ESA",
      "SpaceX",
      "Blue Origin",
      "Research Institutions"
    ]
  },
  {
    id: "space-law",
    title: "Space Law Attorney",
    description: "Specialize in legal aspects of space activities, including international space law, commercial space operations, and space policy.",
    education: {
      required: [
        "Juris Doctor (JD) degree",
        "Bar admission"
      ],
      recommended: [
        "Master's in Space Law",
        "International law experience"
      ]
    },
    skills: [
      "Legal analysis",
      "International law",
      "Policy development",
      "Contract negotiation",
      "Regulatory compliance",
      "Space regulations"
    ],
    responsibilities: [
      "Advise on space law matters",
      "Draft space-related contracts",
      "Handle regulatory compliance",
      "Represent space companies",
      "Develop space policies"
    ],
    salary: {
      entry: "$85,000 - $110,000",
      experienced: "$150,000 - $250,000+"
    },
    resources: {
      courses: [
        "Space Law Fundamentals",
        "International Space Law",
        "Space Policy Development"
      ],
      certifications: [
        "Space Law Certification",
        "International Law",
        "Policy Analysis Certification"
      ],
      organizations: [
        "International Institute of Space Law",
        "Space Law Association",
        "Space Policy Institute"
      ]
    },
    companies: [
      "Space Law Firms",
      "Government Agencies",
      "Space Companies",
      "International Organizations",
      "Research Institutes"
    ]
  },
  {
    id: "space-robotics",
    title: "Space Robotics Engineer",
    description: "Design and develop robotic systems for space exploration, including rovers, robotic arms, and autonomous systems for space missions.",
    education: {
      required: [
        "Bachelor's degree in Robotics, Mechanical Engineering, or related field",
        "Experience in robotics development"
      ],
      recommended: [
        "Master's in Space Systems",
        "Robotics certifications"
      ]
    },
    skills: [
      "Robotics design",
      "Control systems",
      "Mechanical engineering",
      "Programming",
      "Systems integration",
      "Mechanical design"
    ],
    responsibilities: [
      "Design space robots",
      "Develop control systems",
      "Test robotic systems",
      "Integrate with spacecraft",
      "Maintain robotic systems"
    ],
    salary: {
      entry: "$75,000 - $95,000",
      experienced: "$130,000 - $180,000+"
    },
    resources: {
      courses: [
        "Space Robotics Engineering",
        "Robotic Control Systems",
        "Space Systems Integration"
      ],
      certifications: [
        "Robotics Engineering",
        "Control Systems",
        "Space Systems Certification"
      ],
      organizations: [
        "Space Robotics Association",
        "International Space Robotics Society",
        "Robotics Engineering Institute"
      ]
    },
    companies: [
      "NASA JPL",
      "SpaceX",
      "ESA",
      "Robotics Companies",
      "Research Labs"
    ]
  }
]; 