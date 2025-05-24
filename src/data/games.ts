import { Game } from "../types";

export const games: Game[] = [
  {
    id: "asteroid-defender",
    title: "Asteroid Defender",
    description: "Protect Earth from incoming asteroids in this fast-paced arcade game. Shoot down space rocks before they reach our planet and earn points for each successful hit. How long can you defend humanity?",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    route: "/games/asteroid-defender"
  },
  {
    id: "planet-matcher",
    title: "Planet Matcher",
    description: "Test your memory by matching pairs of planets and moons. Flip the cards and find all the space pairs in as few moves as possible. How fast can you complete the cosmic match?",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    route: "/games/planet-matcher"
  },
  {
    id: "space-trivia",
    title: "Space Trivia Challenge",
    description: "Test your knowledge of space exploration, astronomy, and cosmic phenomena in this timed quiz game. Compete for high scores and challenge yourself with questions ranging from basic to expert-level space science.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    route: "/games/space-trivia"
  },
  {
    id: "reflex-test",
    title: "Astro Reflex Challenge",
    description: "Test your reaction time in this astronaut training exercise. Click when the screen turns green and see how fast your reflexes are. Perfect for aspiring astronauts!",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    route: "/games/reflex-test"
  }
];
