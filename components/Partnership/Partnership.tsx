"use client";

import React from "react";
import styles from "./style.module.scss"; // Impor SCSS
import { companies } from "./Data";

const Clients = () => {
  return (
    <div className={styles["clients-container"]}>
       <h2 className={styles["title"]}>Our Partnership</h2>
      <div className={styles["clients-grid"]}>
        {companies.map((company) => (
          <React.Fragment key={company.id}>
            <div className={styles["company-logo"]}>
              {/* Logo */}
              <img
                src={company.img}
                alt={company.name}
                className="" // Ukuran logo jika diperlukan
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Clients;
