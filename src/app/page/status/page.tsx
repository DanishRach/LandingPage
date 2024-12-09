"use client";

import React, { Suspense, useEffect, useState } from "react";
import { projectProps } from "../../../../types/types";
import { getSession } from "@/lib/auth";
import { findProjectByUser, payProject } from "@/api/project";
import styles from "./style.module.scss"; // Impor file SCSS module
import Link from "next/link";
import { transaction } from "@/api/transaction";
import { toast } from "sonner";

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

  async function bayar(projectID: string, userID: string, layananID: string) {
    const formData = new FormData();
    if (projectID) formData.append("projectID", projectID);
    if (userID) formData.append("userID", userID);
    if (layananID) formData.append("layananID", layananID);

    const pay = await transaction(formData);

    if (typeof pay === "string") {
      window.snap.pay(pay, {
        onSuccess: async () => {
          const data = await payProject(formData);
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.success);
          }
        },
        onPending: () => console.log("Payment pending"),
        onError: () => toast.error("Something went wrong"),
        onClose: () =>
          toast.info("Customer closed the popup without finishing the payment"),
      });
    }
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

  return (
    <div className={styles.container}>
      {status?.map((item, index) => (
        <div key={index} className={styles.card}>
          <p className={styles.title}>Data Project {index + 1}</p>
          <p className={styles.field}>Nama Domain: {item.namaDomain}</p>
          <p className={styles.field}>Project: {item.project}</p>
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
                {item.tagihan > 0 ? (
                  <button
                    className={styles.bayarButton}
                    onClick={() =>
                      bayar(item.projectID, item.userID, item.layananID)
                    }
                  >
                    bayar tagihan
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
