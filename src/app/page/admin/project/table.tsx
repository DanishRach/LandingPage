"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss"; // Import the SCSS file
import {
  layananProps,
  projectProps,
  userProps,
} from "../../../../../types/types";
import { changeStatus, editProject, firstPayProject, handleDeploy, payProject } from "@/api/project";
import { toast } from "sonner";
import moment from "moment";
import { getUser } from "@/api/user";
import { getLayanan } from "@/api/bundle";

interface TableProps {
  rows: projectProps[] | undefined | { error: string };
  userData: userProps[] | undefined;
  layananData: layananProps[] | undefined;
}

const Table: React.FC<TableProps> = ({
  rows = [],
  userData = [],
  layananData = [],
}) => {
  const [filter, setFilter] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<boolean[]>(() =>
    Array.isArray(rows) ? Array(rows.length).fill(false) : []
  );
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState({
    projectID: true,
    namaDomain: true,
    domain: true,
    project: true,
    sdhDeplo: true,
    linkDeploy: true,
    tagihan: true,
    createdAt: true,
    tenggat: true,
    userID: true,
    layananID: true,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ensure checkedRows state is updated if rows change
  useEffect(() => {
    if (Array.isArray(rows)) {
      setCheckedRows(Array(rows.length).fill(false));
    } else {
      setCheckedRows([]); // or another fallback value as needed
    }
  }, [rows]);

  // Filter rows based on email
  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        row.project.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  // Handle Select All
  const handleSelectAll = (checked: boolean) => {
    if (Array.isArray(rows)) {
      setIsSelectAll(checked);
      setCheckedRows(Array(rows.length).fill(checked));
    }
  };

  // Handle individual row checkbox
  const handleRowCheckbox = (index: number, checked: boolean) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = checked;
    setCheckedRows(updatedCheckedRows);

    // Update Select All status
    const allChecked = updatedCheckedRows.every((isChecked) => isChecked);
    setIsSelectAll(allChecked);
  };

  // Handle column visibility toggle
  const toggleColumnVisibility = (
    column:
      | "projectID"
      | "domain"
      | "namaDomain"
      | "project"
      | "sdhDeplo"
      | "linkDeploy"
      | "tagihan"
      | "createdAt"
      | "tenggat"
      | "userID"
      | "layananID"
  ) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleChangeStatus = async (
    projectID: string,
    userID: string,
    sdhDeplo: string
  ) => {
    try {
      const formData = new FormData();
      if (sdhDeplo) formData.append("sdhDeplo", sdhDeplo);
      if (sdhDeplo == "FINISH") {
        const linkDeploy = prompt("Please Enter the Deploy Link");
        if (linkDeploy) formData.append("linkDeploy", linkDeploy);
        const addDeploy = await handleDeploy(projectID, formData);
        if (addDeploy.error) {
          toast.error(addDeploy.error);
        } else {
          const result = await changeStatus(projectID, userID, formData);
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(result.success);
          }
        }
      } else {
        const result = await changeStatus(projectID, userID, formData);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.success);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("something wrong");
    }
  };

  const handlePay = async(row: projectProps) => {
    const formdata = new FormData()
    if(row.projectID) formdata.append('projectID', row.projectID)
    if(row.createdAt.getMonth() === new Date(Date.now()).getMonth()){
      const result = await firstPayProject(formdata)
      if (result.error) {
        toast.error(result.error)
      } else{
        toast.success(result.success)
      }
    }else {
      const result = await payProject(formdata)
      if (result.error) {
        toast.error(result.error)
      } else{
        toast.success(result.success)
      }
    }
  }

  const userEmail = (userID: string) => {
    if (userID !== null && userData) {
      const user = userData.find((item) => item.userID === userID);

      return user?.email;
    }
  };

  const layananName = (layananID: string) => {
    if (layananID !== null && layananData) {
      const layanan = layananData.find((item) => item.layananID === layananID);

      return layanan?.judul;
    }
  };

  return (
    <div className={styles["table-container"]}>
      {/* Filter Input and Columns Button */}
      <div className={styles["filter-container"]}>
        <input
          type="text"
          placeholder="Filter emails..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles["filter-input"]}
        />
        <div className={styles["columns-dropdown-wrapper"]}>
          <button
            className={styles["columns-dropdown-btn"]}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Columns ▼
          </button>
          {isDropdownOpen && (
            <div className={styles["columns-dropdown"]}>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.project}
                  onChange={() => toggleColumnVisibility("project")}
                  className="mr-2"
                />
                project
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.namaDomain}
                  onChange={() => toggleColumnVisibility("namaDomain")}
                  className="mr-2"
                />
                nama domain
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.domain}
                  onChange={() => toggleColumnVisibility("domain")}
                  className="mr-2"
                />
                domain
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.tagihan}
                  onChange={() => toggleColumnVisibility("tagihan")}
                  className="mr-2"
                />
                tagihan
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.sdhDeplo}
                  onChange={() => toggleColumnVisibility("sdhDeplo")}
                  className="mr-2"
                />
                Sudah Deploy
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.createdAt}
                  onChange={() => toggleColumnVisibility("createdAt")}
                  className="mr-2"
                />
                createdAt
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.tenggat}
                  onChange={() => toggleColumnVisibility("tenggat")}
                  className="mr-2"
                />
                tenggat
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.userID}
                  onChange={() => toggleColumnVisibility("userID")}
                  className="mr-2"
                />
                userID
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.layananID}
                  onChange={() => toggleColumnVisibility("layananID")}
                  className="mr-2"
                />
                layananID
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={styles["table-wrapper"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-700">
                {/* Select All Checkbox */}
                <input
                  type="checkbox"
                  className="accent-gray-600"
                  checked={isSelectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {visibleColumns.project && (
                <th className="p-2 border-b border-gray-700">project</th>
              )}
              {visibleColumns.namaDomain && (
                <th className="p-2 border-b border-gray-700">nama domain</th>
              )}
              {visibleColumns.domain && (
                <th className="p-2 border-b border-gray-700">domain</th>
              )}
              {visibleColumns.sdhDeplo && (
                <th className="p-2 border-b border-gray-700">deploy</th>
              )}
              {visibleColumns.linkDeploy && (
                <th className="p-2 border-b border-gray-700">Link Deploy</th>
              )}
              {visibleColumns.tagihan && (
                <th className="p-2 border-b border-gray-700">tagihan</th>
              )}
              {visibleColumns.createdAt && (
                <th className="p-2 border-b border-gray-700">createdAt</th>
              )}
              {visibleColumns.tenggat && (
                <th className="p-2 border-b border-gray-700">tenggat</th>
              )}
              {visibleColumns.userID && (
                <th className="p-2 border-b border-gray-700">user</th>
              )}
              {visibleColumns.layananID && (
                <th className="p-2 border-b border-gray-700">layanan</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="p-2 border-b border-gray-700">
                  {/* Individual Checkbox */}
                  <input
                    type="checkbox"
                    className="accent-gray-600"
                    checked={checkedRows[index]}
                    onChange={(e) => handleRowCheckbox(index, e.target.checked)}
                  />
                </td>
                {visibleColumns.project && (
                  <td className="p-2 border-b border-gray-700">
                    {row.project}
                  </td>
                )}
                {visibleColumns.namaDomain && (
                  <td className="p-2 border-b border-gray-700">
                    {row.namaDomain}
                  </td>
                )}
                {visibleColumns.domain && (
                  <td className="p-2 border-b border-gray-700">{row.domain}</td>
                )}
                {visibleColumns.sdhDeplo && (
                  <td className="p-2 border-b border-gray-700">
                    <select
                      value={row.sdhDeplo}
                      onChange={(e) =>
                        handleChangeStatus(
                          row.projectID,
                          row.userID,
                          e.target.value
                        )
                      }
                    >
                      <option value="ONWAITING">On Waiting</option>
                      <option value="ONPROGRESS">On Progress</option>
                      <option value="FINISH">Finish</option>
                    </select>
                  </td>
                )}
                {visibleColumns.linkDeploy && (
                  <td className="p-2 border-b border-gray-700">
                    {row.linkDeploy}
                  </td>
                )}
                {visibleColumns.tagihan && (
                  <td className="p-2 border-b border-gray-700">
                    <p>Rp. {row.tagihan.toLocaleString("id-ID")}</p>
                    <button onClick={() => handlePay(row)} className={`${row.tagihan > 0? '' : 'hidden'}`}>bayar</button>
                  </td>
                )}
                {visibleColumns.createdAt && (
                  <td className="p-2 border-b border-gray-700">
                    {moment(row.createdAt).format("DD/MM/YYYY")}
                  </td>
                )}
                {visibleColumns.tenggat && (
                  <td className="p-2 border-b border-gray-700">
                    {moment(row.tenggat).format("DD/MM/YYYY")}
                  </td>
                )}
                {visibleColumns.userID && (
                  <td className="p-2 border-b border-gray-700">
                    {userEmail(row.userID)}
                  </td>
                )}
                {visibleColumns.layananID && (
                  <td className="p-2 border-b border-gray-700">
                    {layananName(row.layananID)}
                  </td>
                )}
                <td className="p-2 border-b border-gray-700">...</td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className="p-2 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles["table-footer"]}>
        <span>
          {Array.isArray(rows)
            ? checkedRows.filter((isChecked) => isChecked).length
            : 0}{" "}
          of {Array.isArray(rows) ? rows.length : 0} row(s) selected.
        </span>
      </div>
    </div>
  );
};

export default Table;
