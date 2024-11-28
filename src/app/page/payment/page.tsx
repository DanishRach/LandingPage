"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from next/navigation
import { CSSTransition } from "react-transition-group";
import styles from './payment.module.scss';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();  // Get query parameters from the URL
  const [planData, setPlanData] = useState<any>({
    name: "Unknown Plan",
    price: 0,
    features: []
  });

  // Get the query parameters when the component mounts
  useEffect(() => {
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const features = searchParams.get('features');

    setPlanData({
      name: name || "Unknown Plan",
      price: price ? parseFloat(price) : 0,
      features: features ? features.split(",") : []
    });
  }, [searchParams]);

  const { name, price, features } = planData;

  const [showNotification, setShowNotification] = useState(false);

  // Handle form submission
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Show notification
    setShowNotification(true);

    // Hide notification and navigate back after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
      router.push("/?"); // Replace with the route to your transactions page
    }, 2000);
  };

  return (
    <div className={styles['payment-container']}>
      {/* Notification */}
      <CSSTransition
        in={showNotification}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.notification}>
          <div className={styles['notification-box']}>
            Pembayaran Berhasil!
          </div>
        </div>
      </CSSTransition>

      {/* Left Section */}
      <div className={styles['left-section']}>
        <button
          onClick={() => router.back()} // Use router.back() to navigate back
          className={styles['back-button']}
        >
          ← Kembali
        </button>
        <h2 className={styles.title}>Langganan untuk {name}</h2>
        <p className={styles.subtitle}>Per-Bulan</p>

        {/* Price */}
        <div className={styles.price}>
          Rp {price.toLocaleString("id-ID")}
        </div>

        {/* Details */}
        <ul className={styles.features}>
          {features.map((feature: string, index: number) => (
            <li key={index} className={styles['feature-item']}>
              <span className="text-purple-300">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Total */}
        <div className={styles['total-section']}>
          <p className={styles['total-label']}>Total due today</p>
          <div className={styles['total-price']}>
            Rp {price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles['right-section']}>
        {/* Payment Form */}
        <form className={styles['payment-form']} onSubmit={handlePayment}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label>No. Telepon</label>
            <input
              type="tel"
              placeholder="0812 3456 7890"
              required
            />
          </div>
          <div>
            <label>Card information</label>
            <div className={styles['flex-inputs']}>
              <input
                type="text"
                className="w-2/3"
                placeholder="1234 1234 1234 1234"
                required
              />
              <input
                type="text"
                className="w-1/3"
                placeholder="CVC"
                required
              />
            </div>
            <div className={styles['flex-inputs']}>
              <input
                type="text"
                className="half-width"
                placeholder="Bulan / Tahun"
                required
              />
              <input
                type="text"
                className="half-width"
                placeholder="Nama Pemegang Kartu"
                required
              />
            </div>
          </div>
          <div>
            <label>Alamat</label>
            <input
              type="text"
              placeholder="Nama Jalan"
              required
            />
          </div>
          <div className={styles['flex-inputs']}>
            <div className="half-width">
              <label>Provinsi</label>
              <input
                type="text"
                placeholder="Jawa Barat"
                required
              />
            </div>
            <div className="half-width">
              <label>Kode Pos</label>
              <input
                type="text"
                placeholder="12345"
                required
              />
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="submit"
            className={styles['payment-button']}
          >
            Lanjutkan Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
