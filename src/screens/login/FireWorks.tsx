import  { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

const FireworksDisplay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Specify the type of the ref

  useEffect(() => {
    if (containerRef.current) {
      // Get the container's dimensions
      const container = containerRef.current.getBoundingClientRect();

      // Create fireworks instance
      const fireworks = new Fireworks(containerRef.current, {
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 15,
          max: 30,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        lineStyle: "round",
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        flickering: 50,
        opacity: 0.5,
        explosion: 5,
        intensity: 30,
        traceSpeed: 10,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
        boundaries: {
          x: container.x,
          y: container.y,
          width: container.width,
          height: container.height,
        },
      });

      // Start fireworks
      fireworks.start();

      // Cleanup on unmount
      return () => {
        fireworks.stop();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fireworks-example h-screen w-screen z-[100] absolute bg-black translate-y-[-100vh] pointer-events-none"
      
    />
  );
};

export default FireworksDisplay;
