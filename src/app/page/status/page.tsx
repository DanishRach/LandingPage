"use client";

import React, { useEffect, useState } from "react";
import { projectProps } from "../../../../types/types";
import { getSession } from "@/lib/auth";
import { findProjectByUser } from "@/api/project";
import styles from "./style.module.scss"; // Impor file SCSS module
import Link from "next/link";

export default function Page() {
  const [status, setStatus] = useState<projectProps[]>();

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
            {item.sdhDeplo === 'ONWAITING' ? (
              <span className={''}>On Waiting</span>
            ) : <></>}
            {item.sdhDeplo === 'ONPROGRESS' ? (
              <span className={''}>On Progress</span>
            ) : <></>}
            {item.sdhDeplo === 'FINISH' ? (
              <div>
                <span className={''}>Finish</span>
                <Link href={item.linkDeploy!}>{item.linkDeploy}</Link>
              </div>
            ) : <></>}
          </div>
        </div>
      ))}
    </div>
  );
}
