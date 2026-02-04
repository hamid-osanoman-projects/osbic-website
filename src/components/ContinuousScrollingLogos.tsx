import React from "react";
import { motion } from "framer-motion";

interface ScrollingLogosProps {
  images: string[];
  size?: { width: number; height: number };
  gap?: number;
  speed?: number; 
  direction?: "left" | "right";
}

const ContinuousScrollingLogos: React.FC<ScrollingLogosProps> = ({
  images,
  size = { width: 150, height: 150 }, // Standardized size for speed
  gap = 16,
  speed = 50,
  direction = "left",
}) => {
  const logos = [...images, ...images, ...images];
  const totalWidth = images.length * (size.width + gap);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        style={{ gap: `${gap}px` }} // Use style for gap to ensure precision
        animate={{
          x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: (totalWidth / speed),
            ease: "linear",
          },
        }}
      >
        {logos.map((img, i) => (
          <img
            key={i}
            src={`/images/power/${img}`}
            alt="Partner Logo"
            // Explicitly set width/height to prevent Layout Shift
            width={size.width}
            height={size.height}
            loading="lazy"
            decoding="async" // Offloads image decoding from the main thread
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