import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    navigate(`/payment`, {
      state: {
        name: plan.name,
        price: plan.discountPrice || plan.monthlyPrice, // Gunakan harga diskon jika ada
        features: plan.features,
      },
    });
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Harga Paket Bulanan yang Fleksibel
          </h1>
          <p className="text-gray-500 mt-4">
            Pilih paket bulanan sesuai kebutuhan Anda untuk meningkatkan layanan.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border border-gray-200 rounded-lg p-6 text-center"
            >
              <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
              <p className="text-gray-500 mt-2">
                Pilihan terbaik untuk meningkatkan layanan Anda.
              </p>
              <div className="mt-4">
                {/* Harga untuk Penetration Test */}
                {plan.name === "Penetration test" ? (
                  <div className="text-red-600 font-bold text-4xl">Gratis</div>
                ) : (
                  <>
                    {/* Harga dengan diskon */}
                    {plan.discountPrice ? (
                      <div className="text-gray-900 font-bold text-4xl">
                        <span>Rp {plan.discountPrice.toLocaleString("id-ID")}</span>
                        <span className="text-lg font-normal"> /bulan</span>
                      </div>
                    ) : (
                      <div className="text-gray-900 font-bold text-4xl">
                        Rp {plan.monthlyPrice.toLocaleString("id-ID")}
                        <span className="text-lg font-normal"> /bulan</span>
                      </div>
                    )}

                    {/* Harga asli dicoret jika ada diskon */}
                    {plan.discountPrice && (
                      <div className="text-gray-500 text-sm line-through mt-1">
                        Rp {plan.monthlyPrice.toLocaleString("id-ID")}
                      </div>
                    )}
                  </>
                )}
              </div>
              <button
                onClick={() => handleSelectPlan(plan)}
                className="mt-6 px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Pilih Paket
              </button>
              <ul className="mt-6 space-y-2 text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-indigo-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPlans;
