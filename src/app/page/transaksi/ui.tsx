'use client'
import React, { useEffect, useState } from "react";
import styles from "./transaction.module.scss"; // Import SCSS file
import { useRouter } from "next/navigation";
import { layananProps } from "../../../../types/types";
import { getLayanan } from "@/api/bundle";
import { getSession } from "@/lib/auth";
import { toast } from "sonner";
import { mailChangeFinish, mailChangeOnProgress, mailChangeOnWaiting } from "@/api/mailer";

interface Plan {
  layananData: layananProps[] | undefined
}

export default function Ui () {
  const [layanan, setLayanan] = useState<layananProps[] | undefined>([])
  const router = useRouter();

  const handleSelectPlan = (layanan: layananProps) => {
    if (layanan !== undefined) {
      const data = {
        id: layanan.layananID,
        name: layanan.judul,
        price: layanan.harga || layanan.harga, // Use discount price if available
        features: layanan.services.join(","), // Convert the features array to a string
      };
  
      const queryParams = new URLSearchParams({
        id: data.id,
        name: data.name,
        price: data.price.toString(), // Ensure price is a string
        features: data.features,
      }).toString();
  
      // Navigate to the payment page with query parameters
      router.push(`/page/payment?${queryParams}`);
    }
  };

  useEffect(() => {
    async function fetch() {
      const data = await getLayanan()
      setLayanan(data)

    }
    fetch()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Section Title */}
        <div className={styles.title}>
          <h1>Paket Bulanan yang Fleksibel</h1>
          <p>
            Pilih paket bulanan sesuai kebutuhan Anda untuk meningkatkan
            layanan.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className={styles.grid}>
          {layanan !== undefined && layanan.map((plan, index) => (
            <div key={index} className={styles.plan}>
              <h2>{plan.judul}</h2>
              <p>Pilihan terbaik untuk meningkatkan layanan Anda.</p>
              <div className={styles.price}>
                {/* Harga untuk Penetration Test */}
                {plan.judul === "Penetration test" ? (
                  <div className="text-red-600 font-bold text-4xl">Gratis</div>
                ) : (
                  <>
                    {/* Harga dengan diskon */}
                    {plan.harga ? (
                      <div>
                        <span>
                          Rp {plan.harga.toLocaleString("id-ID")}
                        </span>
                        <span> /bulan</span>
                      </div>
                    ) : (
                      <div>
                        Rp {plan.harga.toLocaleString("id-ID")}
                        <span> /bulan</span>
                      </div>
                    )}
                    {/* Harga asli dicoret jika ada diskon */}
                    {plan.harga && (
                      <div className={styles.strikeThrough}>
                        Rp {plan.harga.toLocaleString("id-ID")}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Fitur */}
              <ul className={styles.features}>
                {plan !== undefined && plan.services.map((feature, index) => (
                  <li key={index}>
                    <span className="check">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={styles.button}
                onClick={async () => {
                  const data = await getSession()
                  if(data){
                    handleSelectPlan(plan)
                  }else {
                    toast.error('mohon login terlebih dahulu')
                    router.push('/page/form')
                  }
                  
                }}
              >
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
