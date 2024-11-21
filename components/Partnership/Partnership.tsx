"use client";

import React from "react";
import styles from "./style.module.scss"; // Import SCSS
import { companies } from "./Data";
import Image from "next/image"; // Import Image from next/image

const Clients = () => {
  return (
    <div>
      <div className={styles["clients-container"]}>
        <h2 className={styles["title"]}>Our Partnership</h2>
        <div className={styles["clients-grid"]}>
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className={styles["company-logo"]}>
                {/* Logo */}
                <Image
                  src={company.img}
                  alt={company.name}
                  width={150}  // You can specify the width
                  height={150} // You can specify the height
                  className=""  // Specify any classes if needed
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
