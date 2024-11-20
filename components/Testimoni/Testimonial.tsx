"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./style.module.scss"; // Import SCSS module

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div>
      <h2 className={styles["title"]}>Client Testimonial</h2>
      <div className={styles["testimonials-container"]}>
        <div className={`${styles["grid-container"]} relative`}>
          <div>
            <div className={styles["image-container"]}>
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0,
                      scale: isActive(index) ? 1 : 0.95,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 999 : -1, // Ensure the active image is on top
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 1, // 1.5s duration for smoother transition
                      ease: "easeInOut",
                    }}
                    className={styles["transition"]}
                  >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className={styles["testimonial-image"]}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className={styles["text-container"]}>
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 1, // 1.5s duration for text fade
                  ease: "easeInOut",
                }}
                className={styles["transition"]} // Make sure the text content is absolute to align with image
              >
                <h3 className={styles["testimonial-name"]}>
                  {testimonials[active].name}
                </h3>
                <p className={styles["testimonial-designation"]}>
                  {testimonials[active].designation}
                </p>
                <motion.p
                  className={styles["testimonial-quote"]}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.03 * index,
                      }}
                      className={styles["testimonial-word"]}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
