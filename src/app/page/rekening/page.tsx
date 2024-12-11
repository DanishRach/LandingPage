'use client';

import { useState } from "react";

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
        <div className="absolute top-auto">
          <div className="bg-yellow max-w-fit">
            <p>nomor rekening</p>
            <p>6000046010 -- INOVASI UTAMA NUSANTARA</p>
            <p>Bank BNI</p>
            <button onClick={handleClose}>close</button>
          </div>
        </div>
      )}
    </>
  );
}
