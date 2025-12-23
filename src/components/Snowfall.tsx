import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  opacity: number;
}

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${4 + Math.random() * 8}px`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={{
            left: flake.left,
            top: "-20px",
            width: flake.size,
            height: flake.size,
            background: "radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(200 30% 90% / 0.6))",
            borderRadius: "50%",
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            boxShadow: "0 0 4px hsl(0 0% 100% / 0.5)",
          }}
        />
      ))}
    </div>
  );
}
