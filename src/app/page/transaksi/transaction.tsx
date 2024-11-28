import React from "react";
import styles from "./transaction.module.scss"; // Import SCSS file
import { useRouter } from "next/navigation";

interface Plan {
  name: string;
  monthlyPrice: number;
  discountPrice?: number;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Bronze",
    monthlyPrice: 50000,
    discountPrice: 20000,
    features: ["5 produk", "Hingga 1.000 pelanggan", "Analitik dasar"],
  },
  {
    name: "Silver",
    monthlyPrice: 100000,
    discountPrice: 50000,
    features: [
      "5 produk",
      "Hingga 1.000 pelanggan",
      "Analitik dasar",
      "Respon dukungan dalam 48 jam",
    ],
  },
  {
    name: "Gold",
    monthlyPrice: 200000,
    discountPrice: 100000,
    features: [
      "10 produk",
      "Hingga 10.000 pelanggan",
      "Analitik tingkat lanjut",
      "Respon dukungan dalam 24 jam",
      "Akses fitur premium",
    ],
  },
  {
    name: "Penetration test",
    monthlyPrice: 0, // Gratis
    features: [
      "Produk tanpa batas",
      "Pelanggan tanpa batas",
      "Analitik lengkap",
      "Respon dukungan dalam 12 jam",
      "Akses fitur premium",
      "Konsultasi personal dengan tim ahli",
    ],
  },
];

const TransactionPlans: React.FC = () => {
  const router = useRouter();

  const handleSelectPlan = (plan: Plan) => {
    const data = {
      name: plan.name,
      price: plan.discountPrice || plan.monthlyPrice, // Use discount price if available
      features: plan.features.join(","), // Convert the features array to a string
    };

    const queryParams = new URLSearchParams({
      name: data.name,
      price: data.price.toString(), // Ensure price is a string
      features: data.features,
    }).toString();

    // Navigate to the payment page with query parameters
    router.push(`/page/payment?${queryParams}`);
  };

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
          {plans.map((plan) => (
            <div key={plan.name} className={styles.plan}>
              <h2>{plan.name}</h2>
              <p>Pilihan terbaik untuk meningkatkan layanan Anda.</p>
              <div className={styles.price}>
                {/* Harga untuk Penetration Test */}
                {plan.name === "Penetration test" ? (
                  <div className="text-red-600 font-bold text-4xl">Gratis</div>
                ) : (
                  <>
                    {/* Harga dengan diskon */}
                    {plan.discountPrice ? (
                      <div>
                        <span>
                          Rp {plan.discountPrice.toLocaleString("id-ID")}
                        </span>
                        <span> /bulan</span>
                      </div>
                    ) : (
                      <div>
                        Rp {plan.monthlyPrice.toLocaleString("id-ID")}
                        <span> /bulan</span>
                      </div>
                    )}
                    {/* Harga asli dicoret jika ada diskon */}
                    {plan.discountPrice && (
                      <div className={styles.strikeThrough}>
                        Rp {plan.monthlyPrice.toLocaleString("id-ID")}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Fitur */}
              <ul className={styles.features}>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={styles.button}
                onClick={() => handleSelectPlan(plan)}
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

export default TransactionPlans;
