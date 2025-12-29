'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false);
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);
  const [snowflakes2, setSnowflakes2] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setMounted(true);

    const snowflakesCount = isMobile ? 20 : 60;
    const height = window.innerHeight;
    const width = window.innerWidth;

    function getRandomHeight() {
      return Math.floor(Math.random() * height);
    }

    function getRandomWeight() {
      let rnd = Math.floor(Math.random() * width);
      if (rnd < 30) {
        return 30;
      } else if (rnd > width - 30) {
        return width - 30;
      } else {
        return rnd;
      }
    }

    function getRandomArbitrary(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const a: JSX.Element[] = [];
    const a2: JSX.Element[] = [];

    for (let i = 0; i < snowflakesCount; i++) {
      const x = getRandomHeight();
      const b = getRandomWeight();
      const z = getRandomArbitrary(7, 9);
      const dil = getRandomArbitrary(10, 30);

      a.push(
        <motion.div
          className="absolute h-4 w-4 cursor-default text-white text-lg"
          key={`snow-${i}`}
          style={{
            top: x,
            left: b,
          }}
          animate={{
            y: [0, height],
            x: [0, dil, 0, -dil, 0],
          }}
          transition={{
            duration: z,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          ❄
        </motion.div>
      );

      a2.push(
        <motion.div
          className="absolute h-4 w-4 cursor-default text-white text-lg"
          key={`snow2-${i}`}
          style={{
            top: x - height,
            left: b,
          }}
          animate={{
            y: [0, height],
            x: [0, dil, 0, -dil, 0],
          }}
          transition={{
            duration: z,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          ❄
        </motion.div>
      );
    }

    setSnowflakes(a);
    setSnowflakes2(a2);
  }, []);

  if (!mounted) return null;

  return (
    <div className="background w-screen h-screen fixed pointer-events-none">
      {snowflakes2.map((item) => item)}
      {snowflakes.map((item) => item)}
    </div>
  );
}

export default memo(BackgroundAnimation);
