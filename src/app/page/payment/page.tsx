"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSTransition } from "react-transition-group";
import styles from "./payment.module.scss";
import { userProps } from "../../../../types/types";
import { getSession } from "@/lib/auth";
import { editUser, findUser } from "@/api/user";
import { transaction } from "@/api/transaction";
import { addProject } from "@/api/project";
import { toast } from "sonner";
import Script from "next/script";
import RekeningPage from "../rekening/page";

// declare global {
//   interface Window {
//     snap: {
//       pay: (transactionToken: string, options?: SnapPayOptions) => void;
//     };
//   }
// }

// interface SnapPayOptions {
//   onSuccess?: (result: unknown) => void;
//   onPending?: (result: unknown) => void;
//   onError?: (result: unknown) => void;
//   onClose?: () => void;
// }

const PaymentPageContent = () => {
  const [userLogin, setUserLogin] = useState<userProps | undefined>(undefined);
  const [project, setProject] = useState<string>("");
  const [namaDomain, setNamaDomain] = useState<string>("");
  const [domain, setDomain] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [telp, setTelp] = useState<string>("");
  const [namaDepan, setNamaDepan] = useState<string>("");
  const [namaBelakang, setNamaBelakang] = useState<string>("");
  const [provinsi, setProvinsi] = useState<string>("");
  const [kota, setKota] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [kodePos, setKodePos] = useState<string>("");

  const [showRekeningPage, setShowRekeningPage] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [planData, setPlanData] = useState({
    name: "Unknown Plan",
    price: 0,
    features: [] as string[],
  });

  // Get the query parameters when the component mounts
  useEffect(() => {
    const name = searchParams.get("name");
    const price = searchParams.get("price");
    const features = searchParams.get("features");

    const fetchUser = async () => {
      const data = await getSession();
      const userID = data?.data.userID;
      const userData = await findUser(userID || "");
      setUserLogin(userData || undefined);
    };

    setPlanData({
      name: name || "Unknown Plan",
      price: price ? parseFloat(price) : 0,
      features: features ? features.split(",") : [],
    });

    fetchUser();
  }, [searchParams]);

  const { name, price, features } = planData;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (email) formData.append("email", email);
    if (telp) formData.append("telp", telp);
    if (namaDepan) formData.append("namaDepan", namaDepan);
    if (namaBelakang) formData.append("namaBelakang", namaBelakang);
    if (provinsi) formData.append("provinsi", provinsi);
    if (kota) formData.append("kota", kota);
    if (alamat) formData.append("alamat", alamat);
    if (kodePos) formData.append("kodePos", kodePos);


    if (project) formData.append("project", project);
    if (namaDomain) formData.append("namaDomain", namaDomain);
    if (domain) formData.append("domain", domain);

    const userID = userLogin?.userID;
    const layananID = searchParams.get("id");
    if (userID) formData.append("userID", userID);
    if (layananID) formData.append("layananID", layananID);

    try {
      await editUser(formData);
      const pesan = await addProject(formData);
      if (pesan.error) {
        toast.error(pesan.error)
      } else {
        toast.success(pesan.success)
      }
      setShowRekeningPage(true)
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("error terjadi dalam proses pemesanan");
    }
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_SRC}
        data-client-key={process.env.NEXT_PUBLIC_CLIENT}
        strategy="lazyOnload"
      />
      {showRekeningPage && <RekeningPage data={true} onClose={() => setShowRekeningPage(false)} />}
      <div className={styles["payment-container"]}>
        {/* Left Section */}
        <div className={styles["left-section"]}>
          <button
            onClick={() => router.back()}
            className={styles["back-button"]}
          >
            ← Kembali
          </button>
          <h2 className={styles.title}>Langganan untuk {name}</h2>
          <p className={styles.subtitle}>Per-Bulan</p>

          {/* Price */}
          <div className={styles.price}>Rp {price.toLocaleString("id-ID")}</div>

          {/* Details */}
          <ul className={styles.features}>
            {features.map((feature, index) => (
              <li key={index} className={styles["feature-item"]}>
                <span className="text-purple-300">✔</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className={styles["total-section"]}>
            <p className={styles["total-label"]}>Total due today</p>
            <div className={styles["total-price"]}>
              Rp {price.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles["right-section"]}>
          {/* Payment Form */}
          <form className={styles["payment-form"]} onSubmit={handlePayment}>
            <div>
              <label>Email</label>
              <input
                value={email || userLogin?.email || ""}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label>No. Telepon</label>
              <input
                value={telp || userLogin?.telp || ""}
                onChange={(e) => setTelp(e.target.value)}
                type="number"
                placeholder="0812 3456 7890"
                required
              />
            </div>
            <div>
              <label>Project Information</label>
              <div className={styles["flex-input"]}>
                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  type="text"
                  placeholder="Github Project"
                  required
                />
                <input
                  value={namaDomain}
                  onChange={(e) => setNamaDomain(e.target.value)}
                  type="text"
                  placeholder="Domain"
                  required
                />
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                >
                  <option value="">Select domain</option>
                  <option value="COM">.com</option>
                  <option value="NET">.net</option>
                </select>
              </div>
            </div>
            <div>
              <label>Personal Information</label>
              <div className={styles["flex-inputs"]}>
                <div className="half-width">
                  <input
                    value={namaDepan || userLogin?.namaDepan || ""}
                    onChange={(e) => setNamaDepan(e.target.value)}
                    type="text"
                    placeholder="Nama depan"
                    required
                  />
                </div>
                <div className="half-width">
                  <input
                    value={namaBelakang || userLogin?.namaBelakang || ""}
                    onChange={(e) => setNamaBelakang(e.target.value)}
                    type="text"
                    placeholder="Nama Belakang"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label>Address Information</label>
              <div className={styles["flex-inputs"]}>
                <div className="half-width">
                  <input
                    value={provinsi || userLogin?.provinsi || ""}
                    onChange={(e) => setProvinsi(e.target.value)}
                    type="text"
                    placeholder="Provinsi"
                    required
                  />
                </div>
                <div className="half-width">
                  <input
                    value={kota || userLogin?.kota || ""}
                    onChange={(e) => setKota(e.target.value)}
                    type="text"
                    placeholder="Kota"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <input
                value={alamat || userLogin?.alamat || ""}
                onChange={(e) => setAlamat(e.target.value)}
                type="text"
                placeholder="Alamat"
                required
              />
            </div>
            <div>
              <input
                value={kodePos || userLogin?.kodePos || ""}
                onChange={(e) => setKodePos(e.target.value)}
                type="number"
                placeholder="Kode Pos"
                required
              />
            </div>
            <p>Dengan membeli layanan berikut maka anda menyetujui <a target="_blank" href="/term&condition.pdf">syarat dan ketentuan yang berlaku</a></p>
            <button type="submit" className={styles["payment-button"]}>
              Bayar Sekarang
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
