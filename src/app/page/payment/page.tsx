"use client"

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';  // Import useRouter from next/navigation
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from next/navigation
import { CSSTransition } from "react-transition-group";
import styles from './payment.module.scss';
import { userProps } from "../../../../types/types";
import { getSession } from "@/lib/auth";
import { Domain } from "@prisma/client";
import { editUser, findUser } from "@/api/user";
import { transaction } from "@/api/transaction";
import { addProject } from "@/api/project";
import { toast } from "sonner";
import { findLayanan } from "@/api/bundle";
import Script from "next/script";

declare global {
  interface Window {
    snap: {
      pay: (transactionToken: string, options?: SnapPayOptions) => void;
    };
  }
}
interface SnapPayOptions {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
}

export default function PaymentPage() {

  const [userLogin, setUserLogin] = useState<userProps>()

  const [project, setProject] = useState<string>('')
  const [domain, setDomain] = useState<string>('')
  
  const [email, setEmail] = useState<string>('')
  const [telp, setTelp] = useState<string>('')
  const [namaDepan, setNamaDepan] = useState<string>('')
  const [namaBelakang, setNamaBelakang] = useState<string>('')
  const [provinsi, setProvinsi] = useState<string>('')
  const [kota, setKota] = useState<string>('')
  const [alamat, setAlamat] = useState<string>('')
  const [kodePos, setKodePos] = useState<string>('')

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

    async function fetchUser() {
      const data = await getSession()
      const userID = data?.data.userID
      const userData = await findUser(userID !== undefined? userID : '')
      setUserLogin(userData !== null? userData : undefined)
    }

    setPlanData({
      name: name || "Unknown Plan",
      price: price ? parseFloat(price) : 0,
      features: features ? features.split(",") : []
    });
    fetchUser()
  }, [searchParams]);

  const { name, price, features } = planData;

  const [showNotification, setShowNotification] = useState(false);

  // Handle form submission
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData()
    if(email) formData.append('email',email)
    if(telp) formData.append('telp',telp)
    if(namaDepan) formData.append('namaDepan',namaDepan)
    if(namaBelakang) formData.append('namaBelakang',namaBelakang)
    if(provinsi) formData.append('provinsi',provinsi)
    if(kota) formData.append('kota',kota)
    if(alamat) formData.append('alamat',alamat)
    if(kodePos) formData.append('kodePos',kodePos)
    
      if(project) formData.append('project',project)
    if(domain) formData.append('domain',domain)

      const userID = userLogin?.userID
      const layananID = searchParams.get('id')
      if(userID) formData.append('userID',userID)
      if(layananID) formData.append('layananID',layananID)

      await editUser(formData)
      const pay = await transaction(formData)
        if (typeof pay === 'string') {
            window.snap.pay(pay, {
                onSuccess: async function (){ 
                    const data = await addProject(formData)
                    router.push('/')
                    if (data.error) {
                        toast.error(data.error)
                    } else{
                        toast.success(data.success)
                    }
                },
                onPending: function(){ console.log('pending')},
                onError: function(){toast.error('something wrong')},
                onClose: function(){toast.info('customer closed the popup without finishing the payment')}
            })
        }
  };

  return (
    <>
    <Script
            src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_SRC}
            data-client-key={process.env.NEXT_PUBLIC_CLIENT}
            strategy='lazyOnload'
        />
    <div className={styles['payment-container']}>
      {/* Notification */}
      {/* <CSSTransition
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
      </CSSTransition> */}

      {/* Left Section */}
      <div className={styles['left-section']}>
        <button
          onClick={() => {
            router.back()
          }} // Use router.back() to navigate back
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
              value={email || userLogin?.email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label>No. Telepon</label>
            <input
              value={telp || userLogin?.telp!}
              onChange={(e) => setTelp(e.target.value)}
              type="tel"
              placeholder="0812 3456 7890"
              required
            />
          </div>
          <div>
            <label>Project Informatioin</label>
            <div className={styles['flex-input']}>
            <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Project"
                  required
                />
            <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                >
                  <option></option>
                  <option value={"COM"}>.com</option>
                  <option value={"NET"}>.net</option>
                </select>
            </div>
          </div>
          <div>
            <label>Personal information</label>
            <div className={styles['flex-inputs']}>
              <div className="half-width">
                <input
                  value={namaDepan || userLogin?.namaDepan!}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Nama depan"
                  required
                />
              </div>
              <div className="half-width">
                <input
                  value={namaBelakang || userLogin?.namaBelakang!}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Nama Belakang"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label>Address information</label>
            <div className={styles['flex-inputs']}>
              <div className="half-width">
                <input
                  value={provinsi || userLogin?.provinsi!}
                  onChange={(e) => setProvinsi(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Provinsi"
                  required
                />
              </div>
              <div className="half-width">
                <input
                  value={kota || userLogin?.kota!}
                  onChange={(e) => setKota(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Kota"
                  required
                />
              </div>
            </div>
            <div className={styles['flex-inputs']}>
              <div className="half-width">
                <input
                  value={alamat || userLogin?.alamat!}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Alamat"
                  required
                />
              </div>
              <div className="half-width">
                <input
                  value={kodePos || userLogin?.kodePos!}
                  onChange={(e) => setKodePos(e.target.value)}
                  type="text"
                  className="text"
                  placeholder="Kode Pos"
                  required
                />
              </div>
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
    </>
  );
};
