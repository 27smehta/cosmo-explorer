
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const Stars = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    const starCount = window.innerWidth < 768 ? 50 : 100;
    const stars: Star[] = [];

    // Clear any existing stars
    container.innerHTML = "";

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * 2;

      star.className = "star";
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = opacity.toString();
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.animationDuration = `${animationDuration}s`;
      star.style.animationDelay = `${animationDelay}s`;

      container.appendChild(star);
      stars.push({ x, y, size, opacity, speed: animationDuration });
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={starsRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    ></div>
  );
};

export default Stars;
