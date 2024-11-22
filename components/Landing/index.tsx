'use client'
import React, { useRef, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  // Use useCallback to memoize the animate function
  const animate = useCallback(() => {
    if (xPercent.current < -100) {
      xPercent.current = 0;
    } else if (xPercent.current > 0) {
      xPercent.current = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent.current });
    gsap.set(secondText.current, { xPercent: xPercent.current });
    requestAnimationFrame(animate);
    xPercent.current += 0.1 * direction.current;
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => {
          direction.current = e.direction * -1;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, [animate]);

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image
        src="/images/backgroundnew.svg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Cloud and cyber security service provider</p>
          <p ref={secondText}>Cloud and cyber security service provider</p>
        </div>
      </div>
    </motion.main>
  );
}
