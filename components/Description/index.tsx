import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../src/common/RoundedButton";
import React from "react";

const Description: React.FC = () => {
  const phrase =
    "We are a leading cloud and cybersecurity service provider, dedicated to delivering innovative and reliable solutions that empower businesses to thrive in the digital era. Our services include secure cloud infrastructure, data protection, and advanced cybersecurity measures to safeguard your critical assets from potential threats.";

  // Using useRef with a type for the HTMLDivElement
  const description = useRef<HTMLDivElement | null>(null);

  // useInView to track if the element is in view
  const isInView = useInView(description);

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          Our mission is to provide seamless, secure, and scalable solutions,
          allowing businesses to focus on growth while we take care of their
          digital security and infrastructure.
        </motion.p>
      </div>
    </div>
  );
};

export default Description;
