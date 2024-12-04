import React from "react";
import Table from "./table";
import styles from './page.module.scss'; // Import the SCSS file
import { getUser } from "@/api/user";
import { getProject } from "@/api/project";
import { getLayanan } from "@/api/bundle";

export default async function Page ()  {
  const tableData = await getProject()
  const userData = await getUser()
  const layananData = await getLayanan()
  return (
    <div className={styles.container}>
      <Table rows={tableData} userData={userData} layananData={layananData} />
    </div>
  );
};
