'use client';

import { useState } from "react";
import styles from './RekeningPage.module.scss';

// Define the interface for the page props
interface RekeningPageProps {
  searchParams?: { showPaymentInfo?: boolean; onClose: () => void };  // onClose is required in searchParams
}

export default function RekeningPage({ searchParams }: RekeningPageProps) {
  // Internal state to track if payment info is shown
  const [showPaymentInfo, setShowPaymentInfo] = useState(
    searchParams?.showPaymentInfo ?? true
  );

  // Handle the closing logic
  const handleClose = () => {
    setShowPaymentInfo(false);  // Hide payment info
    if (searchParams?.onClose) {
      searchParams.onClose();  // Call onClose passed from the parent
    }
  };

  return (
    <>
      {showPaymentInfo && (
        <div className={styles.paymentInfo}>
          <div className={styles.container}>
            <p className={styles.title}>Nomor Rekening</p>
            <p className={styles.accountNumber}>6000046010 -- INOVASI UTAMA NUSANTARA</p>
            <p className={styles.bankName}>Bank BNI</p>
            <button className={styles.closeButton} onClick={handleClose}>Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}