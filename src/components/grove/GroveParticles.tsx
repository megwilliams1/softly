"use client";

type ParticleType = "pollen" | "petals" | "wind" | "drops" | "fade" | null;

interface Props {
  type: ParticleType;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function GroveParticles({ type }: Props) {
  if (!type) return null;

  const count = Math.floor(randomBetween(12, 20));
  const particles = Array.from({ length: count }, (_, i) => i);

  if (type === "pollen") {
    return (
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {particles.map((i) => {
          const size = randomBetween(4, 9);
          const left = randomBetween(0, 100);
          const delay = randomBetween(0, 6);
          const duration = randomBetween(5, 10);
          const top = randomBetween(20, 90);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                backgroundColor: "#F5C842",
                opacity: 0.7,
                animation: `pollen-drift ${duration}s ${delay}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (type === "petals") {
    return (
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {particles.map((i) => {
          const w = randomBetween(8, 14);
          const h = randomBetween(5, 9);
          const left = randomBetween(-5, 105);
          const delay = randomBetween(0, 8);
          const duration = randomBetween(6, 12);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "-20px",
                left: `${left}%`,
                width: `${w}px`,
                height: `${h}px`,
                borderRadius: "50%",
                backgroundColor: "#F7B8CC",
                opacity: 0.85,
                animation: `petal-fall ${duration}s ${delay}s linear infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (type === "wind") {
    return (
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {particles.map((i) => {
          const w = randomBetween(30, 80);
          const h = randomBetween(1, 2);
          const top = randomBetween(10, 90);
          const delay = randomBetween(0, 7);
          const duration = randomBetween(4, 9);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: "-100px",
                top: `${top}%`,
                width: `${w}px`,
                height: `${h}px`,
                borderRadius: "2px",
                backgroundColor: "#A8B89A",
                opacity: 0.5,
                animation: `wind-drift ${duration}s ${delay}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (type === "drops") {
    return (
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {particles.map((i) => {
          const w = randomBetween(2, 4);
          const h = randomBetween(8, 16);
          const left = randomBetween(0, 100);
          const delay = randomBetween(0, 6);
          const duration = randomBetween(4, 8);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "-20px",
                left: `${left}%`,
                width: `${w}px`,
                height: `${h}px`,
                borderRadius: "2px",
                backgroundColor: "#9BA8B5",
                opacity: 0.6,
                animation: `drop-fall ${duration}s ${delay}s linear infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (type === "fade") {
    return (
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {particles.map((i) => {
          const size = randomBetween(60, 160);
          const left = randomBetween(0, 100);
          const top = randomBetween(0, 100);
          const delay = randomBetween(0, 5);
          const duration = randomBetween(4, 8);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(176,144,128,0.3) 0%, transparent 70%)",
                animation: `fade-pulse ${duration}s ${delay}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
    );
  }

  return null;
}
