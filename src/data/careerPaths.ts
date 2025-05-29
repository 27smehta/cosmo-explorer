export interface CareerPath {
  id: string;
  title: string;
  description: string;
  education: string[];
  skills: string[];
  companies: string[];
  salary: {
    entry: string;
    mid: string;
    senior: string;
  };
  resources: {
    courses: string[];
    certifications: string[];
    books: string[];
  };
}

export const careerPaths: CareerPath[] = [
  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    description: "Design and develop aircraft, spacecraft, satellites, and missiles",
    education: [
      "Bachelor's in Aerospace Engineering",
      "Master's in Aerospace Engineering (recommended)",
      "PhD for research positions"
    ],
    skills: [
      "CAD Software",
      "Aerodynamics",
      "Propulsion Systems",
      "Materials Science",
      "Systems Engineering"
    ],
    companies: [
      "NASA",
      "SpaceX",
      "Boeing",
      "Lockheed Martin",
      "Blue Origin"
    ],
    salary: {
      entry: "$70,000 - $90,000",
      mid: "$90,000 - $120,000",
      senior: "$120,000 - $180,000"
    },
    resources: {
      courses: [
        "MIT OpenCourseWare - Aerospace Engineering",
        "Coursera - Introduction to Aerospace Engineering",
        "edX - Space Mission Design"
      ],
      certifications: [
        "Professional Engineer (PE) License",
        "Project Management Professional (PMP)",
        "Six Sigma Certification"
      ],
      books: [
        "Introduction to Flight by John Anderson",
        "Space Mission Analysis and Design by Wiley Larson",
        "Aircraft Design: A Conceptual Approach by Daniel Raymer"
      ]
    }
  },
  {
    id: "space-scientist",
    title: "Space Scientist",
    description: "Research and study space phenomena, celestial bodies, and space exploration",
    education: [
      "Bachelor's in Physics/Astronomy",
      "Master's in Space Science",
      "PhD in Astrophysics or related field"
    ],
    skills: [
      "Data Analysis",
      "Scientific Computing",
      "Research Methods",
      "Telescope Operation",
      "Scientific Writing"
    ],
    companies: [
      "NASA",
      "ESA",
      "SETI Institute",
      "Space Science Institute",
      "Universities"
    ],
    salary: {
      entry: "$60,000 - $80,000",
      mid: "$80,000 - $110,000",
      senior: "$110,000 - $160,000"
    },
    resources: {
      courses: [
        "HarvardX - Astrophysics",
        "Coursera - Astronomy and Space Science",
        "edX - Introduction to Astrophysics"
      ],
      certifications: [
        "Research Certification",
        "Data Science Certification",
        "Scientific Computing Certification"
      ],
      books: [
        "Astrophysics for People in a Hurry by Neil deGrasse Tyson",
        "The Elegant Universe by Brian Greene",
        "A Brief History of Time by Stephen Hawking"
      ]
    }
  },
  {
    id: "space-software-engineer",
    title: "Space Software Engineer",
    description: "Develop software for space systems, satellites, and ground control",
    education: [
      "Bachelor's in Computer Science",
      "Master's in Software Engineering",
      "Specialized space systems training"
    ],
    skills: [
      "C++/Python",
      "Embedded Systems",
      "Real-time Systems",
      "Space Systems",
      "Testing & Verification"
    ],
    companies: [
      "SpaceX",
      "NASA JPL",
      "Maxar Technologies",
      "Planet Labs",
      "Rocket Lab"
    ],
    salary: {
      entry: "$80,000 - $100,000",
      mid: "$100,000 - $140,000",
      senior: "$140,000 - $200,000"
    },
    resources: {
      courses: [
        "MIT - Space Systems Engineering",
        "Udacity - Space Systems Software",
        "Coursera - Space Mission Design"
      ],
      certifications: [
        "Space Systems Certification",
        "Embedded Systems Certification",
        "Software Engineering Certification"
      ],
      books: [
        "Space Mission Engineering by James Wertz",
        "Software Engineering for Space Systems",
        "Space Systems Software Engineering"
      ]
    }
  },
  {
    id: "space-medicine",
    title: "Space Medicine Specialist",
    description: "Study and address health challenges in space environments",
    education: [
      "Medical Degree (MD)",
      "Residency in Aerospace Medicine",
      "Space Medicine Fellowship"
    ],
    skills: [
      "Medical Research",
      "Physiology",
      "Emergency Medicine",
      "Space Physiology",
      "Clinical Trials"
    ],
    companies: [
      "NASA Johnson Space Center",
      "ESA",
      "SpaceX",
      "Blue Origin",
      "Research Institutions"
    ],
    salary: {
      entry: "$90,000 - $120,000",
      mid: "$120,000 - $160,000",
      senior: "$160,000 - $220,000"
    },
    resources: {
      courses: [
        "NASA - Space Medicine",
        "Harvard Medical School - Space Physiology",
        "ESA - Space Medicine Training"
      ],
      certifications: [
        "Aerospace Medicine Certification",
        "Space Medicine Specialist",
        "Research Ethics Certification"
      ],
      books: [
        "Space Physiology and Medicine by Nicogossian",
        "Human Spaceflight by Larson",
        "Space Medicine in Project Mercury"
      ]
    }
  },
  {
    id: "space-law",
    title: "Space Law Attorney",
    description: "Specialize in legal aspects of space activities and regulations",
    education: [
      "Law Degree (JD)",
      "Specialization in Space Law",
      "International Law Courses"
    ],
    skills: [
      "International Law",
      "Regulatory Compliance",
      "Contract Law",
      "Policy Analysis",
      "Space Regulations"
    ],
    companies: [
      "Space Law Firms",
      "Government Agencies",
      "Space Companies",
      "International Organizations",
      "Research Institutes"
    ],
    salary: {
      entry: "$85,000 - $110,000",
      mid: "$110,000 - $150,000",
      senior: "$150,000 - $250,000"
    },
    resources: {
      courses: [
        "McGill University - Space Law",
        "International Space University",
        "Space Law and Policy"
      ],
      certifications: [
        "Space Law Certification",
        "International Law Certification",
        "Policy Analysis Certification"
      ],
      books: [
        "Space Law: A Treatise by Lyall",
        "International Space Law by Jakhu",
        "Space Law and Policy"
      ]
    }
  },
  {
    id: "space-robotics",
    title: "Space Robotics Engineer",
    description: "Design and develop robots for space exploration and operations",
    education: [
      "Bachelor's in Robotics/Mechanical Engineering",
      "Master's in Robotics",
      "Space Systems Specialization"
    ],
    skills: [
      "Robotics Design",
      "Control Systems",
      "AI/ML",
      "Space Systems",
      "Mechanical Design"
    ],
    companies: [
      "NASA JPL",
      "SpaceX",
      "ESA",
      "Robotics Companies",
      "Research Labs"
    ],
    salary: {
      entry: "$75,000 - $95,000",
      mid: "$95,000 - $130,000",
      senior: "$130,000 - $180,000"
    },
    resources: {
      courses: [
        "MIT - Space Robotics",
        "Stanford - Robotics",
        "Space Systems Engineering"
      ],
      certifications: [
        "Robotics Certification",
        "AI/ML Certification",
        "Space Systems Certification"
      ],
      books: [
        "Space Robotics by Ellery",
        "Robotics in Space",
        "Space Systems Engineering"
      ]
    }
  }
]; 