import React from "react";
import Table from "./table";
import { TableRow } from "./types";
import styles from './page.module.scss'; // Import the SCSS file

const App: React.FC = () => {
  const tableData: TableRow[] = [
    {
      status: "Success", email: "ken99@yahoo.com", amount: 316,
      tagihan: undefined,
      createdDateTime: undefined,
      userID: undefined,
      layananID: undefined,
      domain: undefined
    },
    {
      status: "Success", email: "abe45@gmail.com", amount: 242,
      tagihan: undefined,
      createdDateTime: undefined,
      userID: undefined,
      layananID: undefined,
      domain: undefined
    },
    {
      status: "Processing", email: "monserrat44@gmail.com", amount: 837,
      tagihan: undefined,
      createdDateTime: undefined,
      userID: undefined,
      layananID: undefined,
      domain: undefined
    },
    {
      status: "Success", email: "silas22@gmail.com", amount: 874,
      tagihan: undefined,
      createdDateTime: undefined,
      userID: undefined,
      layananID: undefined,
      domain: undefined
    },
    {
      status: "Failed", email: "carmella@hotmail.com", amount: 721,
      tagihan: undefined,
      createdDateTime: undefined,
      userID: undefined,
      layananID: undefined,
      domain: undefined
    },
  ];

  return (
    <div className={styles.container}>
      <Table rows={tableData} />
    </div>
  );
};

export default App;