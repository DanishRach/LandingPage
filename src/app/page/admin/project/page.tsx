import React from "react";
import Table from "./table";
import styles from './page.module.scss'; // Import the SCSS file
import { getUser } from "@/api/user";
import { getProject } from "@/api/project";

export default async function Page ()  {
  const tableData = await getProject()

  return (
    <div className={styles.container}>
      <Table rows={tableData} />
    </div>
  );
};
