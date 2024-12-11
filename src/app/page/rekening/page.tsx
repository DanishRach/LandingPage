'use client';
import { useState } from "react";
import { PageProps } from "../../../../.next/types/app/page/rekening/page";


interface rekeingProps {
    data: any;
    onClose: () => void;
}

// Ignore automatic inference and enforce your custom props
export default function RekeningPage({ data, onClose }: rekeingProps) {
    const [showPaymentInfo, setShowPaymentInfo] = useState(data);

    const handleClose = () => {
        setShowPaymentInfo(false);
        onClose();
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
