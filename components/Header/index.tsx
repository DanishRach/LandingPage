"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../src/common/RoundedButton";
import Magnetic from "../../src/common/Magnetic";
import React from "react";
import Link from "next/link";

const Index = () => {
  const header = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();

  // Reset isActive state when pathname changes
  useEffect(() => {
    if (isActive) setIsActive(true);
  }, [pathname, isActive]);

  function coba() {
    alert(pathname);
  } // Added 'isActive' to the dependency array

  // Register ScrollTrigger and animate button on scroll
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (button.current) {
      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
            });
            setIsActive(false);
          },
        },
      });
    }
  }, []); // No changes here

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <Link
                style={{
                  color: pathname === "/" ? "white" : "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href="/"
              >
                Home
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link
                style={{
                  color: pathname === "/" ? "white" : "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href="/page/product"
              >
                Product
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a>Contact</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a>Login</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
};

export default Index;
