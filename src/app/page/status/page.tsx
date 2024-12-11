"use client";

import React, { Suspense, useEffect, useState } from "react";
import { projectProps } from "../../../../types/types";
import { getSession } from "@/lib/auth";
import { findProjectByUser, payProject } from "@/api/project";
import styles from "./style.module.scss"; // Impor file SCSS module
import Link from "next/link";
import { transaction } from "@/api/transaction";
import { toast } from "sonner";
import RekeningPage from "../rekening/page";


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

const Page = () => {
  const [status, setStatus] = useState<projectProps[]>();
  const [showRekeningPage, setShowRekeningPage] = useState(false);

  async function bayar() {
    setShowRekeningPage(true)
  }

  useEffect(() => {
    async function fetch() {
      const userLogin = await getSession();
      const data = await findProjectByUser(userLogin?.data.userID!);

      if (data) {
        setStatus(data);
      }
    }
    fetch();
  }, []);

  const closeRekening =() => {
    setShowRekeningPage(false)
  }

  return (
    <>
    {showRekeningPage && (
        <RekeningPage
          searchParams={{ showPaymentInfo: true, onClose :closeRekening  }} // Pass initial state if needed
          // Pass the onClose handler to RekeningPage
        />
      )}
    <div className={styles.container}>
      {status?.map((item, index) => (
        <div key={index} className={styles.card}>
          <p className={styles.title}>Data Project {index + 1}</p>
          <p className={styles.field}>Nama Domain: {item.namaDomain}</p>
          <p className={styles.field}>Project: {item.project}</p>
          {item.tagihan > 0 ? (
                  <>
                  <p>Rp. {item.tagihan.toLocaleString("id-ID")}</p>
                  <button
                    className={styles.bayarButton}
                    onClick={bayar}
                  >
                    bayar tagihan
                  </button>
                  </>
                ) : (
                  <></>
                )}
          <div className={styles.status}>
            {item.sdhDeplo === "ONWAITING" ? (
              <span className={styles.nonActive}>On Waiting</span>
            ) : (
              <></>
            )}
            {item.sdhDeplo === "ONPROGRESS" ? (
              <span className={styles.progress}>On Progress</span>
            ) : (
              <></>
            )}
            {item.sdhDeplo === "FINISH" ? (
              <div>
                <span className={styles.active}>Finish</span>
                <Link href={item.linkDeploy!} className={styles.linkDeploy}>
                  {item.linkDeploy}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
