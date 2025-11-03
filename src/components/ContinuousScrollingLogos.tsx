import React from "react";
import { motion } from "framer-motion";

interface ScrollingLogosProps {
  images: string[];
  size?: { width: number; height: number };
  gap?: number;
  speed?: number; // pixels per second
  direction?: "left" | "right";
}

const ContinuousScrollingLogos: React.FC<ScrollingLogosProps> = ({
  images,
  size = { width: 150, height: 220 },
  gap = 16,
  speed = 50,
  direction = "left",
}) => {
  // duplicate logos 3x to ensure seamless scroll
  const logos = [...images, ...images, ...images];

  // Animation distance (total width of one set)
  const totalWidth = images.length * (size.width + gap);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: (totalWidth / speed), // duration depends on speed in px/sec
            ease: "linear",
          },
        }}
      >
        {logos.map((img, i) => (
          <img
            key={i}
            src={`/images/power/${img}`}
            alt={`Partner ${i + 1}`}
            style={{
              width: size.width,
              height: size.height,
              flexShrink: 0,
            }}
            className="object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ContinuousScrollingLogos;
