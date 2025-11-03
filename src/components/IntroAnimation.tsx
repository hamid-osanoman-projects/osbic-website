import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const letters = c.querySelectorAll('.letter');

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 300);
        }, 600);
      },
    });

    tl.set(letters, { opacity: 0, y: 40 })
      // 🕊 slower, smoother letter entrance
      .to(letters, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
      })
      // 🧘 hold on screen slightly longer, then slow fade-out
      .to(c, { opacity: 0, duration: 1, delay: 1.2, ease: 'power1.inOut' });

    return () => {
  tl.kill();
};
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex items-center justify-center bg-[#42A5E1] transition-opacity ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div>
        {'OSBIC'.split('').map((ch, i) => (
          <span
            key={i}
            className="letter text-5xl md:text-7xl text-white inline-block"
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.1em',
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
