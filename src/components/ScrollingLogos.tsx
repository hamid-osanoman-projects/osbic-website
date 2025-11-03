import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface ScrollingLogosProps {
  images: string[];
  speed?: number; // seconds for one full scroll
  size?: { width: number; height: number };
  gap?: number;
  direction?: "left" | "right";
}

const ScrollingLogos: React.FC<ScrollingLogosProps> = ({
  images,
  speed = 30,
  size = { width: 140, height: 200 },
  gap = 16,
  direction = "left",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Duplicate images enough for seamless scroll
  const logos = [...images, ...images];

  useEffect(() => {
    if (!containerRef.current) return;
    const totalWidth =
      images.length * (size.width + gap); // width of one set

    const distance = direction === "left" ? -totalWidth : totalWidth;

    controls.start({
      x: [0, distance],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        },
      },
    });
  }, [images, size.width, gap, direction, speed, controls]);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        animate={controls}
      >
        {logos.map((img, i) => (
          <img
            key={i}
            src={`/images/power/${img}`}
            alt={`Partner ${i + 1}`}
            className="object-contain"
            style={{
              width: `${size.width}px`,
              height: `${size.height}px`,
              flexShrink: 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingLogos;
