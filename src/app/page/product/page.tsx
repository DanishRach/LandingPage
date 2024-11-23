"use client"

import { useEffect, useState } from "react";
import styles from "./pricing.module.scss";
import { FaCheck } from "react-icons/fa";
import Preloader from "../../../../components/PreloaderPro";
import { AnimatePresence } from "framer-motion";

const PricingPage = () => {
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
    <div>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div className={styles.pricingContainer}>
        <h1 className={styles.heading}>Pricing Plans</h1>
        <div className={styles.pricingGrid}>
          {/* Freelancer Plan */}
          <div className={styles.pricingCard}>
            <h2>Freelancer</h2>
            <p>The essentials to provide your best work for clients.</p>
            <div className={styles.price}>
              <span>$19</span>/month
            </div>
            <button className={styles.buyButton}>Buy plan</button>
            <ul className={styles.features}>
              <li>
                <FaCheck className={styles.checkIcon} /> 5 products
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Up to 1,000 subscribers
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Basic analytics
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> 48-hour support
                response time
              </li>
            </ul>
          </div>
          {/* Startup Plan */}
          <div className={`${styles.pricingCard} ${styles.mostPopular}`}>
            <h2>Startup</h2>
            <p>A plan that scales with your rapidly growing business.</p>
            <div className={styles.price}>
              <span>$29</span>/month
            </div>
            <button className={styles.buyButton}>Buy plan</button>
            <ul className={styles.features}>
              <li>
                <FaCheck className={styles.checkIcon} /> 25 products
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Up to 10,000
                subscribers
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Advanced analytics
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> 24-hour support
                response time
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Marketing automations
              </li>
            </ul>
          </div>
          {/* Enterprise Plan */}
          <div className={styles.pricingCard}>
            <h2>Enterprise</h2>
            <p>Dedicated support and infrastructure for your company.</p>
            <div className={styles.price}>
              <span>$59</span>/month
            </div>
            <button className={styles.buyButton}>Buy plan</button>
            <ul className={styles.features}>
              <li>
                <FaCheck className={styles.checkIcon} /> Unlimited products
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Unlimited subscribers
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Advanced analytics
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> 1-hour, dedicated
                support response time
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Marketing automations
              </li>
              <li>
                <FaCheck className={styles.checkIcon} /> Custom reporting tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
