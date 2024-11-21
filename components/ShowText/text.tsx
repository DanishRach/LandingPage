"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./anim";

export default function AnimatedMask() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { x, y } = useMousePosition();
  const size: number = isHovered ? 400 : 40;

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x ? x - size / 2 : 0}px ${
            y ? y - size / 2 : 0
          }px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Streamline your business operations with our secure and efficient
          solutions, designed to protect and scale your digital infrastructure
          effortlessly.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p>
          Empower your growth with cutting-edge deployment and cybersecurity
          services tailored to keep your business ahead of threats and
          competition.
        </p>
      </div>
    </main>
  );
}
