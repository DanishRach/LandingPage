import React from "react";
import Table from "./table";
import { TableRow } from "./types";

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
    <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
      <Table rows={tableData} />
    </div>
  );
};

export default App;
