const { kMaxLength } = require("buffer");

document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  

  const articleSearch = document.getElementById('articleSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');
  const gameTabs = document.querySelectorAll('.game-tab');
  const gameContents = document.querySelectorAll('.game-content');
  

  if (articleSearch) {
    articleSearch.addEventListener('input', filterArticles);
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterArticles();
      });
    });
    
    function filterArticles() {
      const searchTerm = articleSearch.value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
      
      articleCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.getAttribute('data-category');
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }
  

  const articleModal = document.getElementById('articleModal');
  const closeModal = document.querySelector('.close-modal');
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      articleModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === articleModal) {
      articleModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  

  if (gameTabs.length > 0) {
    gameTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const gameId = tab.getAttribute('data-game');
        

        gameTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        

        gameContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === gameId) {
            content.classList.add('active');
          }
        });
        

        const scrollPos = window.scrollY;
        window.location.hash = gameId;
        window.scrollTo(0, scrollPos);
      });
    });
    

    if (window.location.hash) {
      const gameId = window.location.hash.substring(1);
      const targetTab = document.querySelector(`.game-tab[data-game="${gameId}"]`);
      if (targetTab) {
        targetTab.click();
      }
    }
  }
  

  const asteroidPlay = document.getElementById('asteroidPlay');
  const triviaPlay = document.getElementById('triviaPlay');
  const matcherPlay = document.getElementById('matcherPlay');
  
  const asteroidMessage = document.getElementById('asteroidMessage');
  const triviaMessage = document.getElementById('triviaMessage');
  const matcherMessage = document.getElementById('matcherMessage');
  
  if (asteroidPlay && asteroidMessage) {
    asteroidPlay.addEventListener('click', () => {
      asteroidMessage.style.display = 'none';
      initAsteroidGame();
    });
  }
  
  if (triviaPlay && triviaMessage) {
    triviaPlay.addEventListener('click', () => {
      triviaMessage.style.display = 'none';
      initTriviaGame();
    });
  }
  
  if (matcherPlay && matcherMessage) {
    matcherPlay.addEventListener('click', () => {
      matcherMessage.style.display = 'none';
      initPlanetMatcherGame();
    });
  }
});


const articleData = {
  'nasa-quantum': {
    title: "NASA's First Space-Based Quantum Gravity Sensor",
    author: "Dr. Sarah Chen",
    date: "April 12, 2025",
    source: "Quantum Space Journal",
    category: "Science",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>NASA has successfully developed and tested the first-ever space-based quantum sensor designed to measure gravity with unprecedented precision. This breakthrough technology utilizes ultra-cold atoms to detect tiny gravitational variations that were previously unmeasurable from space.</p>
      
      <p>The Quantum Gravity Sensor (QGS) works by cooling atoms to near absolute zero using lasers, creating a state where quantum effects become observable. When in this state, atoms can be used as extremely sensitive measurement devices. The QGS can detect variations in gravitational fields by measuring how these fields affect the quantum state of the atoms.</p>
      
      <p>"This technology represents a quantum leap in our ability to measure Earth's gravitational field from space," explained Dr. Robert Jensen, principal investigator of the QGS mission. "With this level of precision, we can detect subtle changes in mass distribution on Earth, from melting ice sheets to shifting tectonic plates."</p>
      
      <p>The implications of this technology extend beyond Earth observation. Future missions could deploy similar sensors to map the gravitational fields of other planets and moons with extraordinary detail, potentially revealing hidden subsurface structures like underground oceans or caverns.</p>
      
      <p>The first operational deployment of the QGS is planned for early 2026 aboard a dedicated Earth observation satellite. Scientists anticipate that data from this mission will revolutionize our understanding of Earth's internal structure and dynamics while opening new avenues for planetary exploration throughout the solar system.</p>
    `,
    quiz: [
      {
        question: "What unique state of matter does the Quantum Gravity Sensor use?",
        options: [
          "Superheated plasma",
          "Ultra-cold atoms near absolute zero",
          "Quantum entangled photons",
          "Superconducting materials"
        ],
        correctAnswer: 1
      },
      {
        question: "What can be detected by measuring variations in gravitational fields?",
        options: [
          "Dark matter particles",
          "Quantum fluctuations in space-time",
          "Changes in mass distribution like melting ice sheets",
          "Solar radiation particles"
        ],
        correctAnswer: 2
      },
      {
        question: "When is the first operational deployment of the QGS planned?",
        options: [
          "It's already deployed",
          "Late 2025",
          "Early 2026",
          "2030"
        ],
        correctAnswer: 2
      }
    ]
  },
  'hubble-eagle': {
    title: "Hubble's Breathtaking New Image of Eagle Nebula",
    author: "Michael Roberts",
    date: "April 8, 2025",
    source: "Astronomy Today",
    category: "Discovery",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>The Hubble Space Telescope has captured a stunning new image of the Eagle Nebula (M16) that reveals unprecedented details of this stellar nursery located 6,500 light-years away in the constellation Serpens.</p>
      
      <p>This latest image surpasses the famous "Pillars of Creation" photograph from 1995, utilizing Hubble's upgraded instrumentation to reveal delicate structures and processes never before seen in this iconic formation.</p>
      
      <p>The new observation combined ultraviolet, visible, and near-infrared imaging to create a comprehensive view of the nebula's dust columns, which are being sculpted by the intense radiation from nearby massive stars. These columns contain hydrogen gas and dust that serve as incubators for new star formation.</p>
      
      <p>"What makes this image so exceptional is that we can now see the process of star birth and destruction happening simultaneously," explained Dr. Elisa Montoya, lead scientist for the observation program. "We're witnessing stellar winds and radiation eroding the dust columns while new stars are forming within them."</p>
      
      <p>The image reveals dozens of previously unseen protostars embedded within the nebula's columns. Additionally, astronomers have identified several young stellar objects that have recently emerged from their dusty cocoons and are now emitting powerful jets of material into the surrounding nebula.</p>
      
      <p>This observation is part of a larger Hubble program studying star formation across different environments in our galaxy. The data collected will help astronomers better understand how stars of different masses form and how this process is affected by their surroundings.</p>
    `,
    quiz: [
      {
        question: "How far away is the Eagle Nebula from Earth?",
        options: [
          "1,500 light-years",
          "4,000 light-years",
          "6,500 light-years",
          "10,000 light-years"
        ],
        correctAnswer: 2
      },
      {
        question: "Which types of imaging were combined to create this new image?",
        options: [
          "X-ray, gamma-ray, and radio",
          "Ultraviolet, visible, and near-infrared",
          "Microwave, infrared, and visible",
          "Radio, visible, and ultraviolet"
        ],
        correctAnswer: 1
      },
      {
        question: "What are being sculpted by radiation from nearby massive stars?",
        options: [
          "Planetary rings",
          "Dust columns",
          "Black holes",
          "Gas giants"
        ],
        correctAnswer: 1
      }
    ]
  },
  'dark-matter': {
    title: "Ultralight Dark Matter's Role in Black Hole Formation",
    author: "Dr. James Wong",
    date: "April 5, 2025",
    source: "Astrophysics Journal",
    category: "Physics",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>A groundbreaking study published this week has found compelling evidence that ultralight dark matter particles may play a crucial role in the formation and evolution of supermassive black holes. The research, conducted by an international team of astrophysicists, provides a potential solution to the long-standing puzzle of how black holes can grow so quickly in the early universe.</p>
      
      <p>Dark matter, which makes up about 85% of the matter in the universe, has remained mysterious since it doesn't interact with light or other forms of electromagnetic radiation. Ultralight dark matter is a hypothetical form of dark matter consisting of particles with extremely small masses, potentially billions of times lighter than electrons.</p>
      
      <p>The team's computer simulations show that clouds of ultralight dark matter can form dense structures called "dark matter halos" around early black hole seeds. These halos accelerate the growth of black holes by efficiently channeling regular matter toward the center.</p>
      
      <p>"Our models suggest that ultralight dark matter creates a sort of fast lane for normal matter to fall into black holes," explained Dr. Elena Mikhailov, the study's lead author. "This could explain how supermassive black holes were able to form within just a billion years after the Big Bang, which has been difficult to account for with conventional theories."</p>
      
      <p>The research team analyzed data from several black holes observed by the James Webb Space Telescope, finding patterns in their growth that align with their ultralight dark matter models. Particularly compelling was evidence from a recently discovered black hole that appears to have reached 10 billion solar masses when the universe was only 700 million years old.</p>
      
      <p>These findings not only provide insights into black hole formation but may also help physicists narrow down the properties of dark matter itself, one of the biggest mysteries in modern physics.</p>
    `,
    quiz: [
      {
        question: "What percentage of matter in the universe is dark matter?",
        options: [
          "About 25%",
          "About 50%",
          "About 85%",
          "About 95%"
        ],
        correctAnswer: 2
      },
      {
        question: "How do ultralight dark matter particles compare to electrons in mass?",
        options: [
          "They are slightly heavier",
          "They are about the same mass",
          "They are billions of times lighter",
          "They have no mass at all"
        ],
        correctAnswer: 2
      },
      {
        question: "According to the research, what do dark matter halos do?",
        options: [
          "Block regular matter from reaching black holes",
          "Channel regular matter toward black holes",
          "Create new black holes spontaneously",
          "Slow down black hole rotation"
        ],
        correctAnswer: 1
      }
    ]
  },
  'mars-habitability': {
    title: "Curiosity Rover's Evidence for Past Habitability on Mars",
    author: "Emily Johnson",
    date: "April 1, 2025",
    source: "Mars Exploration Chronicle",
    category: "Discovery",
    image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>NASA's Curiosity rover has discovered compelling new evidence that Mars once had conditions suitable for microbial life. The latest findings from Gale Crater include complex organic molecules preserved in ancient lake bed sediments and unexpected patterns of atmospheric methane that suggest biological activity may have once flourished on the Red Planet.</p>
      
      <p>The rover's Sample Analysis at Mars (SAM) instrument detected a diverse range of organic compounds in rock samples dated to approximately 3.5 billion years ago. These compounds include several molecules that on Earth are primarily produced by living organisms.</p>
      
      <p>"What's particularly exciting is that we're finding these biosignatures preserved in environments that would have been habitable," said Dr. Jennifer Morris, a member of the Curiosity science team. "The rocks we're examining were formed in a lake environment with a neutral pH, low salinity, and all the key elements needed for life as we know it."</p>
      
      <p>In addition to the organic molecules, Curiosity discovered mineral formations that typically form in the presence of microbial communities on Earth. These include distinctive patterns in iron-rich clay deposits that resemble those produced by bacterial colonies in terrestrial environments.</p>
      
      <p>The rover also documented seasonal variations in methane levels in the Martian atmosphere that correlate with surface temperature changes. On Earth, most atmospheric methane is produced by biological processes, though it can also come from geological sources.</p>
      
      <p>"While these findings don't prove that life existed on Mars, they significantly strengthen the case that the ancient Martian environment was not only habitable but potentially inhabited," explained Dr. Michael Chen, Curiosity's principal investigator. "We're seeing multiple, independent lines of evidence that all point in the same direction."</p>
      
      <p>These discoveries will help inform the Mars Sample Return mission, a joint NASA-ESA effort to bring Martian samples back to Earth for more detailed analysis in the early 2030s.</p>
    `,
    quiz: [
      {
        question: "How old are the rock samples where organic compounds were found?",
        options: [
          "About 1 million years",
          "About 500 million years",
          "About 3.5 billion years",
          "About 4.5 billion years"
        ],
        correctAnswer: 2
      },
      {
        question: "What type of environment were the examined rocks formed in?",
        options: [
          "Volcanic vents",
          "A lake with neutral pH",
          "A highly acidic river",
          "A frozen ice cap"
        ],
        correctAnswer: 1
      },
      {
        question: "What atmospheric gas shows seasonal variations that could indicate biological activity?",
        options: [
          "Oxygen",
          "Carbon dioxide",
          "Nitrogen",
          "Methane"
        ],
        correctAnswer: 3
      },
      {
        question: "When is the Mars Sample Return mission expected to bring samples to Earth?",
        options: [
          "It already has",
          "By 2028",
          "Early 2030s",
          "Mid 2040s"
        ],
        correctAnswer: 2
      }
    ]
  },
  'spacex-iss': {
    title: "SpaceX's Latest ISS Cargo Mission",
    author: "Thomas Miller",
    date: "March 28, 2025",
    source: "Space Industry Today",
    category: "Mission",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>SpaceX successfully launched its 39th commercial resupply mission (CRS-39) to the International Space Station yesterday, delivering over 7,500 pounds of scientific equipment, crew supplies, and new technology demonstrations. The Cargo Dragon capsule lifted off from Launch Complex 40 at Cape Canaveral Space Force Station at 4:27 PM EDT atop a Falcon 9 rocket.</p>
      
      <p>The mission represents several milestones for SpaceX's cargo program, including the first use of their new Dragon XL cargo vehicle, which offers 30% more payload capacity than previous Dragon spacecraft. This upgrade allows NASA to send larger scientific instruments and more supplies in a single mission.</p>
      
      <p>Among the scientific payloads on this mission is the Advanced Plant Habitat-9 experiment, which will test crop growth techniques in microgravity with applications for future long-duration space missions. The mission also carries the Quantum Communication Terminal, a demonstration of secure data transmission using quantum encryption between the space station and Earth.</p>
      
      <p>"This mission demonstrates the continuing evolution of our cargo capabilities," said Jessica Martinez, SpaceX's Director of Dragon Mission Management. "With Dragon XL, we're able to support more ambitious science and provide better resupply capabilities for the growing ISS crew complement."</p>
      
      <p>For the first time, the mission includes prototype components for NASA's Lunar Gateway, the planned space station in lunar orbit that will support Artemis program operations. These components will be tested on the ISS before being incorporated into the Gateway's final design.</p>
      
      <p>The first-stage booster, making its seventh flight, successfully landed on the droneship "A Shortfall of Gravitas" stationed in the Atlantic Ocean. The Dragon capsule is expected to dock with the International Space Station tomorrow morning at approximately 6:30 AM EDT, where it will remain for about 30 days before returning to Earth with research samples and equipment no longer needed on the station.</p>
    `,
    quiz: [
      {
        question: "What is the new Dragon cargo vehicle called and what advantage does it offer?",
        options: [
          "Dragon Max - 20% more payload",
          "Dragon XL - 30% more payload",
          "Dragon Heavy - 50% more payload",
          "Dragon Plus - 15% more payload"
        ],
        correctAnswer: 1
      },
      {
        question: "What experiment aboard will test crop growth in microgravity?",
        options: [
          "Lunar Botany Module",
          "Space Plant Growing System",
          "Advanced Plant Habitat-9",
          "Microgravity Agricultural Pod"
        ],
        correctAnswer: 2
      },
      {
        question: "How many flights has the first-stage booster completed including this mission?",
        options: [
          "Three",
          "Five",
          "Seven",
          "Ten"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the name of the droneship where the booster landed?",
        options: [
          "Of Course I Still Love You",
          "Just Read the Instructions",
          "A Shortfall of Gravitas",
          "Autonomous Spaceport Drone Ship"
        ],
        correctAnswer: 2
      }
    ]
  },
  'gamma-ray': {
    title: "Gamma-ray Bursts Revealing Universe's Largest Structures",
    author: "Dr. Sophia Kim",
    date: "March 25, 2025",
    source: "Cosmology Research Digest",
    category: "Physics",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>A pioneering study using gamma-ray bursts (GRBs) as cosmic beacons has revealed the largest structures yet observed in the universe, challenging current cosmological models. The international research team used data from over 1,500 GRBs—the most energetic explosions in the cosmos—to probe the distribution of matter across unprecedented distances.</p>
      
      <p>Gamma-ray bursts are fleeting but incredibly bright flashes of high-energy radiation that occur when massive stars collapse or when neutron stars merge. Because they are so luminous, they can be detected from the very early universe, making them ideal for studying large-scale cosmic structures.</p>
      
      <p>By analyzing how the light from these distant explosions is absorbed and scattered by intervening matter, astronomers have mapped enormous filaments and voids spanning up to 20 billion light-years—structures significantly larger than the theoretical maximum size predicted by the standard cosmological model.</p>
      
      <p>"What we're seeing is truly remarkable," said Dr. Hiroshi Tanaka, the study's lead author. "These structures are so vast that light would take 20 billion years to travel from one end to the other—longer than the age of the universe itself. This suggests these patterns had to have been imprinted very early in cosmic history."</p>
      
      <p>The discovery poses a challenge to the Cosmological Principle, a fundamental assumption that the universe is homogeneous and isotropic when observed at sufficiently large scales. These newly observed structures suggest the universe may be more clustered and complex at the largest scales than previously thought.</p>
      
      <p>"We might need to revisit some of our basic assumptions about how structure forms in the universe," explained Dr. Maria Gonzalez, a cosmologist who was not involved in the study. "These observations could point to new physics beyond our current understanding, perhaps involving dark energy or the initial conditions of the Big Bang."</p>
      
      <p>The research team is continuing their work by incorporating data from new GRB detections and other cosmic probes to refine their map of these enormous structures and better understand their implications for cosmology.</p>
    `,
    quiz: [
      {
        question: "What are gamma-ray bursts primarily caused by?",
        options: [
          "Supernova explosions or merging black holes",
          "Massive star collapse or neutron star mergers",
          "Asteroid collisions in distant galaxies",
          "Matter falling into supermassive black holes"
        ],
        correctAnswer: 1
      },
      {
        question: "How large are the cosmic structures discovered in this study?",
        options: [
          "Up to 5 billion light-years",
          "Up to 10 billion light-years",
          "Up to 20 billion light-years",
          "Up to 100 billion light-years"
        ],
        correctAnswer: 2
      },
      {
        question: "What fundamental cosmological assumption is challenged by these findings?",
        options: [
          "The Big Bang Theory",
          "The Cosmological Principle",
          "The Theory of General Relativity",
          "The Dark Energy Hypothesis"
        ],
        correctAnswer: 1
      },
      {
        question: "Why are gamma-ray bursts useful for studying cosmic structures?",
        options: [
          "They last for many years, providing stable light sources",
          "They're extremely luminous and can be detected from the early universe",
          "They only occur in regions with specific matter densities",
          "They can be easily created in laboratories for controlled studies"
        ],
        correctAnswer: 1
      }
    ]
  },
  'mars-volcanic': {
    title: "New Photos of Volcanic Terrain on Mars",
    author: "Robert Davis",
    date: "March 22, 2025",
    source: "Planetary Science Weekly",
    category: "Discovery",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>The Mars Reconnaissance Orbiter (MRO) has captured stunning new high-resolution images of volcanic terrain in the Tharsis region of Mars, providing unprecedented details of lava flows that may be significantly younger than previously thought. The images, taken by the orbiter's HiRISE camera, reveal features suggesting volcanic activity could have occurred within the last few million years—extremely recent by Martian geological standards.</p>
      
      <p>The Tharsis region is home to some of the largest volcanoes in the solar system, including Olympus Mons, which stands nearly three times the height of Mount Everest. While scientists have long known these volcanoes formed billions of years ago, the question of when they last erupted has remained open.</p>
      
      <p>The new images show remarkably preserved lava channels, collapse features, and volcanic vents with minimal impact cratering or erosion, suggesting they haven't been exposed to the Martian environment for very long, geologically speaking.</p>
      
      <p>"We're seeing textures and features that look surprisingly fresh," explained Dr. Sarah Williams, a volcanologist with the MRO science team. "The preservation of these delicate structures suggests they formed relatively recently, challenging our understanding of Mars as a geologically dead world."</p>
      
      <p>Particularly intriguing are a series of small shield volcanoes and fissure eruptions on the flanks of Alba Mons. These features bear striking similarities to recent volcanic deposits in Hawaii and Iceland on Earth, with flow patterns indicating low-viscosity basaltic lava.</p>
      
      <p>The possibility of geologically recent volcanism on Mars has significant implications for the planet's internal heat budget and potential for subsurface habitable environments. Volcanic activity provides both heat and chemical energy that could potentially support microbial life in underground aquifers.</p>
      
      <p>"If Mars has been volcanically active in the geologically recent past, it increases the chances that potentially habitable environments might exist beneath the surface today," said Dr. Luis Perez, an astrobiologist consulting on the project. "Volcanic systems on Earth sustain vast microbial ecosystems, and we might find something similar on Mars."</p>
      
      <p>The research team plans to target additional suspected young volcanic sites for high-resolution imaging and will use other instruments on the MRO to analyze the mineral composition of these areas.</p>
    `,
    quiz: [
      {
        question: "What is the name of the camera on the Mars Reconnaissance Orbiter that captured these images?",
        options: [
          "MARCI",
          "HiRISE",
          "CRISM",
          "SHARAD"
        ],
        correctAnswer: 1
      },
      {
        question: "How tall is Olympus Mons compared to Mount Everest?",
        options: [
          "About the same height",
          "Nearly twice as tall",
          "Nearly three times as tall",
          "About half as tall"
        ],
        correctAnswer: 2
      },
      {
        question: "What Earth features are similar to the recently discovered Martian volcanic features?",
        options: [
          "Volcanic deposits in Hawaii and Iceland",
          "The Sahara Desert dunes",
          "Antarctic ice formations",
          "Grand Canyon erosion patterns"
        ],
        correctAnswer: 0
      },
      {
        question: "Why would recent volcanic activity be significant for potential Martian life?",
        options: [
          "It would create surface oxygen",
          "It would melt all the polar ice caps",
          "It could provide heat and chemical energy for subsurface habitats",
          "It would create permanent surface water lakes"
        ],
        correctAnswer: 2
      }
    ]
  },
  'lyrid-meteor': {
    title: "The Lyrid Meteor Shower: Viewing Tips and Science",
    author: "Lisa Martinez",
    date: "March 20, 2025",
    source: "Night Sky Observer",
    category: "Science",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>The annual Lyrid meteor shower will peak on April 22-23, offering skywatchers a chance to observe one of the oldest known meteor showers, with records dating back over 2,700 years. This year's shower coincides with a new moon, creating ideal dark sky conditions for viewing.</p>
      
      <p>The Lyrids typically produce about 10-20 meteors per hour during their peak, though occasional outbursts can boost that number significantly. In 1982, observers in the United States counted nearly 100 Lyrid meteors per hour, and similar outbursts were recorded in 1922 and 1945.</p>
      
      <p>Unlike some meteor showers that occur as Earth passes through relatively fresh comet debris, the Lyrids result from Earth's intersection with the ancient debris stream of Comet Thatcher (C/1861 G1), which orbits the sun once every 415 years. The comet last visited the inner solar system in 1861 and won't return until 2276.</p>
      
      <p>"The Lyrid meteors are particularly interesting to scientists because they contain material that's been orbiting the sun for thousands of years," explained astronomer Dr. Marcus Bennett. "By studying their composition through spectroscopy, we can learn about conditions in the early solar system."</p>
      
      <p>For the best viewing experience, experts recommend finding a location away from city lights with a clear view of the sky. The shower is named after the constellation Lyra, from which the meteors appear to radiate, but they can appear anywhere in the sky.</p>
      
      <p>"You don't need to look directly at Lyra to see the meteors," advised amateur astronomer Sophia Garcia. "In fact, meteors that appear farther from the radiant point tend to have longer, more spectacular trails."</p>
      
      <p>Peak viewing time will be between midnight and dawn on April 23, though some activity will be visible for several days before and after. Observers should allow at least 20 minutes for their eyes to adapt to the darkness, and resist the temptation to check bright phone screens, which can reset dark adaptation.</p>
      
      <p>While no special equipment is needed to view the shower, bringing a reclining chair or blanket, warm clothing, and some patience will enhance the experience. Astrophotographers hoping to capture the event should use wide-angle lenses, tripods, and long exposures to maximize their chances of catching a bright meteor.</p>
    `,
    quiz: [
      {
        question: "When will the Lyrid meteor shower peak this year?",
        options: [
          "March 20-21",
          "April 1-2",
          "April 22-23",
          "May 5-6"
        ],
        correctAnswer: 2
      },
      {
        question: "How many meteors per hour does the Lyrid shower typically produce?",
        options: [
          "1-5",
          "10-20",
          "50-60",
          "Over 100"
        ],
        correctAnswer: 1
      },
      {
        question: "Which comet is responsible for the Lyrid meteor shower?",
        options: [
          "Halley's Comet",
          "Comet NEOWISE",
          "Comet Thatcher",
          "Comet Hale-Bopp"
        ],
        correctAnswer: 2
      },
      {
        question: "How often does Comet Thatcher orbit the Sun?",
        options: [
          "Every 76 years",
          "Every 133 years",
          "Every 415 years",
          "Every 1,000 years"
        ],
        correctAnswer: 2
      },
      {
        question: "What should you avoid during meteor shower viewing to maintain night vision?",
        options: [
          "Wearing warm clothing",
          "Using binoculars",
          "Looking at bright phone screens",
          "Using a reclining chair"
        ],
        correctAnswer: 2
      }
    ]
  },
  'ai-solar': {
    title: "How AI is Revolutionizing Solar Research",
    author: "Dr. Alan Zhang",
    date: "March 18, 2025",
    source: "Heliophysics Journal",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532166219874-3a920e142bbc?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>Artificial intelligence is transforming solar physics research, enabling scientists to predict solar flares, understand the sun's magnetic field, and model solar dynamics with unprecedented accuracy. These advancements come at a crucial time as we enter Solar Cycle 25, which is showing stronger activity than initially predicted.</p>
      
      <p>At the National Solar Observatory, researchers have developed an AI system called DeepSun that analyzes thousands of solar images per day from various space-based observatories. The system can identify subtle patterns in the sun's magnetic field that often precede solar flares and coronal mass ejections (CMEs)—massive eruptions of plasma and magnetic field from the sun's corona.</p>
      
      <p>"DeepSun can detect precursors to solar flares up to 48 hours in advance with about 85% accuracy," explained Dr. Rebecca Chen, lead developer of the system. "This significantly improves upon previous prediction methods, which typically gave us just a few hours of warning."</p>
      
      <p>Solar flares and CMEs can disrupt satellite operations, telecommunications, power grids, and pose radiation risks to astronauts. More accurate predictions allow operators to take protective measures, such as putting satellites into safe modes or rescheduling spacewalks.</p>
      
      <p>Another AI application is helping solve one of solar physics' most enduring mysteries: why the sun's corona is hundreds of times hotter than its surface. A machine learning algorithm developed by an international team has identified previously undetectable nanoscale magnetic reconnection events that may contribute significantly to coronal heating.</p>
      
      <p>"The AI doesn't just analyze data faster—it finds patterns humans might never notice," said Dr. James Wilson, a solar physicist at the European Space Agency. "We're seeing structures and dynamics in the solar atmosphere that challenge our existing theories."</p>
      
      <p>Perhaps most impressively, AI systems are now creating highly accurate models of the sun's interior, where direct observation is impossible. By analyzing surface oscillations—a technique called helioseismology—machine learning algorithms can infer the conditions deep within the sun and model how energy generated in the core is transported outward.</p>
      
      <p>These AI applications are not just academic exercises. As society becomes increasingly dependent on technology vulnerable to space weather, better solar forecasting has significant practical implications. The economic impact of a single severe solar storm could reach into the trillions of dollars, according to some estimates.</p>
      
      <p>"We're entering an era where AI isn't just a tool in solar physics—it's becoming an essential collaborator," concluded Dr. Chen. "The sun is so complex that human analysis alone can't keep up with the volume of data we're collecting. With AI assistance, we're making discoveries that are changing our fundamental understanding of our star."</p>
    `,
    quiz: [
      {
        question: "What is the name of the AI system developed at the National Solar Observatory?",
        options: [
          "SolarAI",
          "DeepSun",
          "HelioPredict",
          "SunSpotter"
        ],
        correctAnswer: 1
      },
      {
        question: "How far in advance can DeepSun predict solar flares?",
        options: [
          "Up to 12 hours",
          "Up to 24 hours",
          "Up to 48 hours",
          "Up to 72 hours"
        ],
        correctAnswer: 2
      },
      {
        question: "Why is the sun's corona a mystery to scientists?",
        options: [
          "It's hundreds of times hotter than the sun's surface",
          "It's impossible to observe",
          "It changes color unpredictably",
          "It contains unknown elements"
        ],
        correctAnswer: 0
      },
      {
        question: "What technique analyzes surface oscillations to infer conditions inside the sun?",
        options: [
          "Spectroscopy",
          "Magnetometry",
          "Helioseismology",
          "Coronagraphy"
        ],
        correctAnswer: 2
      }
    ]
  },
  'astronaut-return': {
    title: "Return of NASA's Oldest Active Astronaut from ISS",
    author: "Jennifer Lewis",
    date: "March 15, 2025",
    source: "Space Flight Now",
    category: "Mission",
    image: "https://images.unsplash.com/photo-1630694093867-4b28d0d21f09?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1169&h=600",
    content: `
      <p>NASA astronaut Dr. Victor Martinez, 61, has successfully returned to Earth after a record-breaking 10-month mission aboard the International Space Station (ISS), becoming the oldest person to complete an extended-duration spaceflight. The Crew Dragon spacecraft carrying Martinez and three other crew members splashed down off the coast of Florida yesterday at 3:42 PM EST.</p>
      
      <p>Martinez, a physician and veteran of three previous spaceflights, was specifically selected for this mission to help scientists better understand how extended microgravity exposure affects older individuals—research that will be crucial for future long-duration missions to Mars and beyond.</p>
      
      <p>"The data we've collected from Dr. Martinez's mission is invaluable," said Dr. Laura Kim, lead scientist for NASA's Human Research Program. "We've been able to study cardiovascular, musculoskeletal, and cognitive changes in an older astronaut during extended spaceflight for the first time, and many of our initial findings have been surprising."</p>
      
      <p>Preliminary results suggest that Martinez experienced less bone density loss than younger astronauts typically do, possibly due to pre-flight preventative measures including a specialized exercise and medication regimen. However, he showed similar cardiovascular adaptations to those seen in younger crew members.</p>
      
      <p>During his time on the ISS, Martinez conducted over 200 scientific experiments, performed two spacewalks totaling 13 hours and 24 minutes, and mentored younger astronauts in medical procedures and emergency response protocols.</p>
      
      <p>"Age is just a number when it comes to exploration," Martinez said during a brief post-landing interview. "What matters is preparation, adaptability, and maintaining your health—principles that apply whether you're in space or on Earth."</p>
      
      <p>NASA officials noted that Martinez's successful mission could pave the way for more diverse age ranges in future astronaut selections, particularly as commercial spaceflight opportunities expand and longer missions are planned.</p>
      
      <p>"Dr. Martinez has shown that with proper screening and preparation, the astronaut age range can be broader than we've traditionally considered," explained NASA's Associate Administrator for Human Exploration, Rebecca Johnson. "This has implications not just for NASA but for all spacefaring nations and commercial space companies planning future missions."</p>
      
      <p>Martinez will now begin a rehabilitation program to readapt to Earth's gravity while scientists continue analyzing the wealth of medical data collected during his mission. A comprehensive study comparing his physiological responses to those of younger astronauts is expected to be published later this year.</p>
    `,
    quiz: [
      {
        question: "How long was Dr. Martinez's mission on the ISS?",
        options: [
          "6 months",
          "8 months",
          "10 months",
          "12 months"
        ],
        correctAnswer: 2
      },
      {
        question: "What is Dr. Martinez's profession besides being an astronaut?",
        options: [
          "Engineer",
          "Physicist",
          "Physician",
          "Geologist"
        ],
        correctAnswer: 2
      },
      {
        question: "What surprising finding was noted about Dr. Martinez during his mission?",
        options: [
          "He experienced more bone density loss than younger astronauts",
          "He experienced less bone density loss than younger astronauts",
          "He was unable to complete scheduled spacewalks",
          "He developed serious health complications"
        ],
        correctAnswer: 1
      },
      {
        question: "How many spacewalks did Dr. Martinez perform during this mission?",
        options: [
          "None",
          "One",
          "Two",
          "Three"
        ],
        correctAnswer: 2
      },
      {
        question: "Why was studying an older astronaut important according to the article?",
        options: [
          "To set new age records in space",
          "To prepare for future long-duration missions",
          "To reduce training costs for younger astronauts",
          "To satisfy public interest in older astronauts"
        ],
        correctAnswer: 1
      }
    ]
  }
};


function openArticle(articleId) {
  const article = articleData[articleId];
  if (!article) return;
  
  const articleModal = document.getElementById('articleModal');
  const articleContent = document.getElementById('articleContent');
  
  if (articleModal && articleContent) {

    let articleHTML = `
      <div class="article-header">
        <img src="${article.image}" alt="${article.title}">
        <h2>${article.title}</h2>
        <div class="article-meta">
          <span>${article.author} | ${article.source}</span>
          <span>${article.date}</span>
        </div>
      </div>
      <div class="article-content">
        ${article.content}
      </div>
    `;
    

    articleHTML += `
      <div class="quiz-container">
        <h3>Test Your Knowledge</h3>
        <div class="quiz-progress">
          <span>Question <span class="quiz-current-question">1</span>/${article.quiz.length}</span>
          <span class="quiz-timer">Time left: <span class="seconds-left">/${article.quiz.length}</span>s</span>
        </div>
        <div class="quiz-questions"></div>
      </div>
    `;
    
    articleContent.innerHTML = articleHTML;
    articleModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    

    initQuiz(articleId);
  }
}


function initQuiz(articleId) {
  const article = articleData[articleId];
  const quizContainer = document.querySelector('.quiz-questions');
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  function showQuestion(index) {
    if (index >= article.quiz.length) {

      quizContainer.innerHTML = `
        <div class="quiz-result">
          <h3>Quiz Complete!</h3>
          <div class="quiz-score">${score}/${article.quiz.length}</div>
          <p class="quiz-score-message">${getScoreMessage(score, article.quiz.length)}</p>
          <button class="btn primary" onclick="document.getElementById('articleModal').style.display='none'; document.body.style.overflow='auto';">Close</button>
        </div>
      `;
      return;
    }
    

    clearInterval(timer);
    timeLeft = 30;
    document.querySelector('.seconds-left').textContent = timeLeft;
    

    timer = setInterval(() => {
      timeLeft--;
      document.querySelector('.seconds-left').textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timer);

        setTimeout(() => {
          currentQuestion++;
          document.querySelector('.quiz-current-question').textContent = currentQuestion + 1;
          showQuestion(currentQuestion);
        }, 1000);
      }
    }, 1000);
    
    const question = article.quiz[index];
    let questionHTML = `
      <div class="quiz-question">${question.question}</div>
      <div class="quiz-options">
    `;
    
    question.options.forEach((option, i) => {
      questionHTML += `<div class="quiz-option" data-index="${i}">${option}</div>`;
    });
    
    questionHTML += `</div><div class="quiz-feedback"></div>`;
    
    quizContainer.innerHTML = questionHTML;
    

    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', function() {
        clearInterval(timer);
        
        const selectedIndex = parseInt(this.getAttribute('data-index'));
        const isCorrect = selectedIndex === question.correctAnswer;
        
        document.querySelectorAll('.quiz-option').forEach(opt => {
          opt.classList.remove('selected');
          opt.style.pointerEvents = 'none';
        });
        
        this.classList.add('selected');
        
        if (isCorrect) {
          this.classList.add('correct');
          document.querySelector('.quiz-feedback').textContent = "Correct!";
          document.querySelector('.quiz-feedback').classList.add('correct');
          score++;
        } else {
          this.classList.add('incorrect');
          document.querySelectorAll('.quiz-option')[question.correctAnswer].classList.add('correct');
          document.querySelector('.quiz-feedback').textContent = "Incorrect. The correct answer is: " + 
            question.options[question.correctAnswer];
          document.querySelector('.quiz-feedback').classList.add('incorrect');
        }
        

        setTimeout(() => {
          currentQuestion++;
          document.querySelector('.quiz-current-question').textContent = currentQuestion + 1;
          showQuestion(currentQuestion);
        }, 2000);
      });
    });
  }
  
  function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Outstanding! You're a space expert!";
    if (percentage >= 70) return "Great job! You know your space facts!";
    if (percentage >= 50) return "Good effort! Keep exploring space knowledge!";
    return "Keep learning! The cosmos has many secrets to discover.";
  }
  

  showQuestion(currentQuestion);
}


function initAsteroidGame() {
  const canvas = document.getElementById('asteroidGame');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('asteroidScore');
  const livesElement = document.getElementById('asteroidLives');
  

  let score = 0;
  let lives = 3;
  let gameOver = false;
  let asteroids = [];
  let lasers = [];
  let gameLoop;
  

  const ship = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    speed: 5,
    moving: {
      left: false,
      right: false,
      up: false,
      down: false
    },
    shooting: false,
    lastShot: 0,
    color: '#05D8E8'
  };
  

  function init() {

    score = 0;
    lives = 3;
    gameOver = false;
    asteroids = [];
    lasers = [];
    ship.x = canvas.width / 2;
    ship.y = canvas.height - 30;
    

    createAsteroids(5);
    

    scoreElement.textContent = score;
    livesElement.textContent = lives;
    

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 16); 
  }
  

  function createAsteroids(num) {
    for (let i = 0; i < num; i++) {
      const size = Math.random() * 30 + 20; 
      asteroids.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 2 + 1,
        color: '#7F5AF0',
        health: Math.ceil(size / 15) 
      });
    }
  }
  

  function keyDownHandler(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') ship.moving.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') ship.moving.right = true;
    if (e.key === 'ArrowUp' || e.key === 'w') ship.moving.up = true;
    if (e.key === 'ArrowDown' || e.key === 's') ship.moving.down = true;
    if (e.key === ' ' || e.key === 'Spacebar') ship.shooting = true;
  }
  
  function keyUpHandler(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') ship.moving.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') ship.moving.right = false;
    if (e.key === 'ArrowUp' || e.key === 'w') ship.moving.up = false;
    if (e.key === 'ArrowDown' || e.key === 's') ship.moving.down = false;
    if (e.key === ' ' || e.key === 'Spacebar') ship.shooting = false;
  }
  

  function update() {
    if (gameOver) return;
    

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    if (ship.moving.left && ship.x > 0) ship.x -= ship.speed;
    if (ship.moving.right && ship.x < canvas.width - ship.width) ship.x += ship.speed;
    if (ship.moving.up && ship.y > canvas.height / 2) ship.y -= ship.speed;
    if (ship.moving.down && ship.y < canvas.height - ship.height) ship.y += ship.speed;
    

    ctx.fillStyle = ship.color;
    ctx.beginPath();
    ctx.moveTo(ship.x + ship.width / 2, ship.y);
    ctx.lineTo(ship.x, ship.y + ship.height);
    ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
    ctx.closePath();
    ctx.fill();
    

    if (ship.shooting && Date.now() - ship.lastShot > 300) {
      lasers.push({
        x: ship.x + ship.width / 2 - 2,
        y: ship.y,
        width: 4,
        height: 15,
        speed: 7,
        color: '#FF2975'
      });
      ship.lastShot = Date.now();
    }
    

    for (let i = lasers.length - 1; i >= 0; i--) {
      const laser = lasers[i];
      laser.y -= laser.speed;
      

      if (laser.y < 0) {
        lasers.splice(i, 1);
        continue;
      }
      

      ctx.fillStyle = laser.color;
      ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      

      for (let j = asteroids.length - 1; j >= 0; j--) {
        const asteroid = asteroids[j];
        
        if (
          laser.x < asteroid.x + asteroid.width &&
          laser.x + laser.width > asteroid.x &&
          laser.y < asteroid.y + asteroid.height &&
          laser.y + laser.height > asteroid.y
        ) {
          asteroid.health--;
          
          if (asteroid.health <= 0) {

            asteroids.splice(j, 1);
            score += Math.floor(asteroid.width);
            scoreElement.textContent = score;
            

            if (score > 0 && score % 200 === 0) {
              createAsteroids(Math.min(5, Math.floor(score / 400) + 2));
            }
          }
          

          lasers.splice(i, 1);
          break;
        }
      }
    }
    

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      asteroid.y += asteroid.speed;
      

      if (asteroid.y > canvas.height) {
        asteroids.splice(i, 1);
        lives--;
        livesElement.textContent = lives;
        
        if (lives <= 0) {
          endGame();
          return;
        }
        continue;
      }
      

      if (
        ship.x < asteroid.x + asteroid.width &&
        ship.x + ship.width > asteroid.x &&
        ship.y < asteroid.y + asteroid.height &&
        ship.y + ship.height > asteroid.y
      ) {

        asteroids.splice(i, 1);
        lives--;
        livesElement.textContent = lives;
        
        if (lives <= 0) {
          endGame();
          return;
        }
        continue;
      }
      

      ctx.fillStyle = asteroid.color;
      ctx.beginPath();
      ctx.arc(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, 
              asteroid.width / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    

    if (Math.random() < 0.02 && asteroids.length < 10 + Math.floor(score / 200)) {
      createAsteroids(1);
    }
  }
  

  function endGame() {
    gameOver = true;
    clearInterval(gameLoop);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
    

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FF2975';
    ctx.font = '36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px "Space Grotesk", sans-serif';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    
    ctx.font = '18px "Inter", sans-serif';
    ctx.fillText('Click Play Again to restart', canvas.width / 2, canvas.height / 2 + 50);
    

    const asteroidMessage = document.getElementById('asteroidMessage');
    if (asteroidMessage) {
      asteroidMessage.style.display = 'flex';
      asteroidMessage.innerHTML = `
        <h3>Game Over</h3>
        <p>Your score: ${score}</p>
        <button class="btn primary" id="asteroidRestart">Play Again</button>
      `;
      
      document.getElementById('asteroidRestart').addEventListener('click', function() {
        asteroidMessage.style.display = 'none';
        init();
      });
    }
  }
  

  init();
}


function initTriviaGame() {
  const triviaGame = document.getElementById('triviaGame');
  const triviaMessage = document.getElementById('triviaMessage');
  const currentQuestionElement = document.getElementById('currentQuestion');
  const timeLeftElement = document.getElementById('timeLeft');
  const questionTextElement = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const feedbackText = document.getElementById('feedbackText');
  const nextButton = document.getElementById('nextQuestion');
  

  if (triviaMessage) triviaMessage.style.display = 'none';
  

  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  let questions = [];
  

  function generateQuestions() {
    const allQuestions = [];
    

    for (const articleId in articleData) {
      const article = articleData[articleId];
      article.quiz.forEach(q => {
        allQuestions.push({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: article.title
        });
      });
    }
    

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }
  

  function startGame() {

    questions = generateQuestions();
    

    currentQuestion = 0;
    score = 0;
    
    currentQuestionElement.textContent = "1";
    nextButton.style.display = 'none';
    
    showQuestion(0);
  }
  
  function showQuestion(index) {
    if (index >= questions.length) {
      showResults();
      return;
    }
    
    const question = questions[index];
    
    feedbackText.textContent = "";
    feedbackText.className = "trivia-feedback";
    
    questionTextElement.textContent = question.question;
    

    optionsContainer.innerHTML = "";
    question.options.forEach((option, i) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'trivia-option';
      optionElement.textContent = option;
      optionElement.dataset.index = i;
      optionElement.addEventListener('click', () => selectAnswer(i));
      optionsContainer.appendChild(optionElement);
    });
    

    timeLeft = 30;
    timeLeftElement.textContent = timeLeft;
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
      timeLeft--;
      timeLeftElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        timeOut();
      }
    }, 1000);
  }
  

  function selectAnswer(index) {
    clearInterval(timer);
    const question = questions[currentQuestion];
    

    document.querySelectorAll('.trivia-option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    

    const selectedOption = document.querySelector(`.trivia-option[data-index="${index}"]`);
    selectedOption.classList.add('selected');
    

    if (index === question.correctAnswer) {
      selectedOption.classList.add('correct');
      feedbackText.textContent = "Correct!";
      feedbackText.className = "trivia-feedback correct-answer";
      score++;
    } else {
      selectedOption.classList.add('incorrect');
      const correctOption = document.querySelector(`.trivia-option[data-index="${question.correctAnswer}"]`);
      correctOption.classList.add('correct');
      feedbackText.textContent = "Incorrect!";
      feedbackText.className = "trivia-feedback incorrect-answer";
    }
    

    nextButton.style.display = 'block';
    nextButton.onclick = nextQuestion;
  }
  

  function timeOut() {

    document.querySelectorAll('.trivia-option').forEach(option => {
      option.style.pointerEvents = 'none';
    });
    

    const question = questions[currentQuestion];
    const correctOption = document.querySelector(`.trivia-option[data-index="${question.correctAnswer}"]`);
    correctOption.classList.add('correct');
    
    feedbackText.textContent = "Time's up!";
    feedbackText.className = "trivia-feedback incorrect-answer";
    

    nextButton.style.display = 'block';
    nextButton.onclick = nextQuestion;
  }
  

  function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
      currentQuestionElement.textContent = currentQuestion + 1;
      showQuestion(currentQuestion);
      nextButton.style.display = 'none';
    } else {
      showResults();
    }
  }
  

  function showResults() {
    clearInterval(timer);
    
    triviaGame.innerHTML = `
      <div class="quiz-result">
        <h3>Quiz Complete!</h3>
        <div class="quiz-score">${score}/${questions.length}</div>
        <p class="quiz-score-message">${getScoreMessage(score, questions.length)}</p>
        <button class="btn primary" id="playAgainBtn">Play Again</button>
      </div>
    `;
    
    document.getElementById('playAgainBtn').addEventListener('click', () => {
      triviaMessage.style.display = 'none';
      startGame();
    });
  }
  
  function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Outstanding! You're a space expert!";
    if (percentage >= 70) return "Great job! You know your space facts!";
    if (percentage >= 50) return "Good effort! Keep exploring space knowledge!";
    return "Keep learning! The cosmos has many secrets to discover.";
  }
  

  startGame();
}

function initWeightCalculator() {
  const earthWeightInput = document.getElementById('earth-weight');
  const kgToggle = document.getElementById('kg-toggle');
  const lbsToggle = document.getElementById('lbs-toggle');
  const calculateButton = document.getElementById('calculate-weight');
  const planetsGrid = document.getElementById('planets-grid');
  
  let isKg = true;
  
  const planetData = [
      { name: 'Mercury', gravity: 0.38, image: 'https://source.unsplash.com/random/100x100?mercury' },
      { name: 'Venus', gravity: 0.91, image: 'https://source.unsplash.com/random/100x100?venus' },
      { name: 'Earth', gravity: 1, image: 'https://source.unsplash.com/random/100x100?earth' },
      { name: 'Moon', gravity: 0.166, image: 'https://source.unsplash.com/random/100x100?moon' },
      { name: 'Mars', gravity: 0.38, image: 'https://source.unsplash.com/random/100x100?mars' },
      { name: 'Jupiter', gravity: 2.34, image: 'https://source.unsplash.com/random/100x100?jupiter' },
      { name: 'Saturn', gravity: 1.06, image: 'https://source.unsplash.com/random/100x100?saturn' },
      { name: 'Uranus', gravity: 0.92, image: 'https://source.unsplash.com/random/100x100?uranus' },
      { name: 'Neptune', gravity: 1.19, image: 'https://source.unsplash.com/random/100x100?neptune' },
      { name: 'Pluto', gravity: 0.06, image: 'https://source.unsplash.com/random/100x100?pluto' }
  ];
  
  kgToggle.addEventListener('click', function() {
      if (!isKg) {
          isKg = true;
          kgToggle.classList.add('active');
          lbsToggle.classList.remove('active');
          
          if (earthWeightInput.value) {
              earthWeightInput.value = Math.round(parseFloat(earthWeightInput.value) / 2.20462);
          }
      }
  });
  
  lbsToggle.addEventListener('click', function() {
      if (isKg) {
          isKg = false;
          lbsToggle.classList.add('active');
          kgToggle.classList.remove('active');
          
          if (earthWeightInput.value) {
              earthWeightInput.value = Math.round(parseFloat(earthWeightInput.value) * 2.20462);
          }
      }
  });
  
  calculateButton.addEventListener('click', function() {
      const earthWeight = parseFloat(earthWeightInput.value);
      
      if (isNaN(earthWeight) || earthWeight <= 0) {
          alert('Please enter a valid weight!');
          return;
      }
      
      let planetsHTML = '';
      
      planetData.forEach(planet => {
          const planetWeight = earthWeight * planet.gravity;
          let weightText, comparisonText;
          
          if (isKg) {
              weightText = `${planetWeight.toFixed(1)} kg`;
              
              if (planet.gravity < 1) {
                  comparisonText = `${Math.round((1 - planet.gravity) * 100)}% lighter than on Earth`;
              } else if (planet.gravity > 1) {
                  comparisonText = `${Math.round((planet.gravity - 1) * 100)}% heavier than on Earth`;
              } else {
                  comparisonText = 'Same as Earth';
              }
          } else {
              const weightLbs = planetWeight * 2.20462;
              weightText = `${weightLbs.toFixed(1)} lbs`;
              
              if (planet.gravity < 1) {
                  comparisonText = `${Math.round((1 - planet.gravity) * 100)}% lighter than on Earth`;
              } else if (planet.gravity > 1) {
                  comparisonText = `${Math.round((planet.gravity - 1) * 100)}% heavier than on Earth`;
              } else {
                  comparisonText = 'Same as Earth';
              }
          }
          
          planetsHTML += `
              <div class="planet-card">
                  <div class="planet-icon" style="background-image: url('${planet.image}')"></div>
                  <div class="planet-name">${planet.name}</div>
                  <div class="planet-weight">${weightText}</div>
                  <div class="planet-comparison">${comparisonText}</div>
              </div>
          `;
      });
      
      planetsGrid.innerHTML = planetsHTML;
  });
  
  calculateButton.click();
}

function initPlanetMatcherGame() {
  const matcherGrid = document.getElementById('matcherGrid');
  const moveCountElement = document.getElementById('moveCount');
  const matchCountElement = document.getElementById('matchCount');
  const gameTimeElement = document.getElementById('gameTime');
  

  let moves = 0;
  let matches = 0;
  let gameStarted = false;
  let gameTime = 0;
  let timer;
  let firstCard = null;
  let secondCard = null;
  let canFlip = true;
  

  const planets = [
    'mercury', 'venus', 'earth', 'mars', 
    'jupiter', 'saturn', 'uranus', 'neptune'
  ];
  

  let cards = [];
  for (let i = 0; i < planets.length; i++) {
    cards.push({
      planet: planets[i],
      matched: false,
      flipped: false,
      id: i * 2
    });
    cards.push({
      planet: planets[i],
      matched: false,
      flipped: false,
      id: i * 2 + 1
    });
  }
  

  function startGame() {

    moves = 0;
    matches = 0;
    gameStarted = false;
    gameTime = 0;
    firstCard = null;
    secondCard = null;
    canFlip = true;
    

    cards = shuffleCards(cards);
    

    moveCountElement.textContent = moves;
    matchCountElement.textContent = matches;
    gameTimeElement.textContent = gameTime;
    

    createGrid();
    

    if (timer) clearInterval(timer);
  }
  

  function shuffleCards(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  

  function createGrid() {
    matcherGrid.innerHTML = '';
    
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('div');
      card.className = 'matcher-card';
      card.dataset.id = cards[i].id;
      
      const front = document.createElement('div');
      front.className = 'matcher-card-front';
      front.innerHTML = '<div class="card-pattern"></div>';
      
      const back = document.createElement('div');
      back.className = 'matcher-card-back';
      

      const planetEmojis = {
        'mercury': '🌑',
        'venus': '🌕',
        'earth': '🌎',
        'mars': '🔴',
        'jupiter': '🟠',
        'saturn': '🪐',
        'uranus': '🔵',
        'neptune': '🟣' 
      };
      
      back.textContent = planetEmojis[cards[i].planet];
      back.style.fontSize = '2rem';
      
      card.appendChild(front);
      card.appendChild(back);
      
      card.addEventListener('click', () => flipCard(card, i));
      
      matcherGrid.appendChild(card);
    }
  }
  

  function flipCard(cardElement, index) {
    if (!gameStarted) {
      gameStarted = true;
      timer = setInterval(() => {
        gameTime++;
        gameTimeElement.textContent = gameTime;
      }, 1000);
    }
    
    if (!canFlip || cards[index].matched || cards[index].flipped) return;
    

    cardElement.classList.add('flipped');
    cards[index].flipped = true;
    

    if (firstCard === null) {
      firstCard = index;
      return;
    }
    
    secondCard = index;
    moves++;
    moveCountElement.textContent = moves;
    
    if (cards[firstCard].planet === cards[secondCard].planet) {
      cards[firstCard].matched = true;
      cards[secondCard].matched = true;
      matches++;
      matchCountElement.textContent = matches;
      
      firstCard = null;
      secondCard = null;
      
      if (matches === planets.length) {
        endGame();
      }
    } else {
      canFlip = false;
      setTimeout(() => {
        document.querySelector(`[data-id="${cards[firstCard].id}"]`).classList.remove('flipped');
        document.querySelector(`[data-id="${cards[secondCard].id}"]`).classList.remove('flipped');
        cards[firstCard].flipped = false;
        cards[secondCard].flipped = false;
        
        firstCard = null;
        secondCard = null;
        canFlip = true;
      }, 1000);
    }
  }
  
  function endGame() {
    clearInterval(timer);
    
    setTimeout(() => {
      const matcherMessage = document.getElementById('matcherMessage');
      if (matcherMessage) {
        matcherMessage.style.display = 'flex';
        matcherMessage.innerHTML = `
          <h3>Game Complete!</h3>
          <p>You matched all planets in ${moves} moves and ${gameTime} seconds</p>
          <button class="btn primary" id="matcherRestart">Play Again</button>
        `;
        
        document.getElementById('matcherRestart').addEventListener('click', function() {
          matcherMessage.style.display = 'none';
          startGame();
        });
      }
    }, 1000);
  }
  
  startGame();
}
















