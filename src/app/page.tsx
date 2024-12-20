"use client";
import styles from './page.module.scss'
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../../components/Preloader";
import Landing from "../../components/Landing";
import Projects from "../../components/Projects";
import Description from "../../components/Description";
import SlidingImages from "../../components/SlidingImages";
import Contact from "../../components/Contact";
import Clients from "../../components/Partnership/Partnership";
import React from "react";
import { Demo } from '../../components/Testimoni/ShowTestimonial';
import AnimatedMask from '../../components/ShowText/text';
import TransactionPlans from './page/transaksi/ui';
import Ui from './page/inbox/ui';
import { getLayanan } from '@/api/bundle';


// Declare the Home component as a functional component
const Home: React.FC = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // Dynamically import LocomotiveScroll and initialize it
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Clients />
      <AnimatedMask />
      <Projects />
      <TransactionPlans />
      <Demo />
      <SlidingImages />
      <Contact />
    </main>
  );
};

export default Home;
