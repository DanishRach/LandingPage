import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

interface SliderItem {
  src: string;
  color?: string; // assuming color might be added to some items
}

const slider1: SliderItem[] = [
  {
    src: 'bronze.svg',
  },
  {
    src: 'silver.svg',
  },
  {
    src: 'gold.svg',
  },
  {
    src: 'pen.svg',
  },
];

const slider2: SliderItem[] = [
  {
    src: 'pen.svg',
  },
  {
    src: 'gold.svg',
  },
  {
    src: 'silver.svg',
  },
  {
    src: 'bronze.svg',
  },
];

const Index = (): JSX.Element => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    // @ts-ignore
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div className={styles.imageContainer}>
              <Image fill={true} alt="image" src={`/images/${project.src}`} />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div className={styles.imageContainer}>
              <Image fill={true} alt="image" src={`/images/${project.src}`} />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <motion.div className={styles.circle} />
      </motion.div>
    </div>
  );
};

export default Index;
