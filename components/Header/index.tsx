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
import { deleteSession, getSession } from "@/lib/auth";

const Index = () => {
  const header = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const pathname = usePathname();

  // Reset isActive state when pathname changes
  async function chekLogin() {
    const data = await getSession()
    const user = data?.data
    if (user) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }
  useEffect(() => {
    if (isActive) setIsActive(true);
    chekLogin()
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
        {pathname.startsWith("/page/admin") ? (
          <div className={styles.nav}>
            <Magnetic>
              <div className={styles.el}>
                <Link
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  href="/page/admin/user"
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
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  href="/page/admin/project"
                >
                  Project
                </Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <Link
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  href="/page/admin/layanan_admin"
                >
                  Layanan
                </Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>

          </div>
        ) : (
          <div className={styles.nav}>
            <Magnetic>
              <div className={styles.el}>
                <Link
                  style={{
                    color: pathname === "/" ? "white" : "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    display: pathname === "" ? "none" : "inline",
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
                  href="/page/inbox"
                >
                  inbox
                </Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            {isLogin?
            <Magnetic>
            <div className={styles.el}>
              <Link
                onClick={async () => {
                  await deleteSession();
                }}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href="/page/form"
              >
                Log Out
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
            :
            <Magnetic>
            <div className={styles.el}>
              <Link
                style={{
                  color: pathname === "/" ? "white" : "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href="/page/form"
              >
                Login
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>}
            
          </div>
        )}
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
