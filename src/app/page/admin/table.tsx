"use client";

import React, { useState, useEffect } from "react";
import { TableRow } from "./types";
import styles from './page.module.scss'; // Import the SCSS file

interface TableProps {
  rows: TableRow[];
}

const Table: React.FC<TableProps> = ({ rows = [] }) => {
  const [filter, setFilter] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<boolean[]>(Array(rows.length).fill(false));
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState({
    status: true,
    email: true,
    amount: true,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ensure checkedRows state is updated if rows change
  useEffect(() => {
    setCheckedRows(Array(rows.length).fill(false));
  }, [rows]);

  // Filter rows based on email
  const filteredRows = rows.filter((row) =>
    row.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle Select All
  const handleSelectAll = (checked: boolean) => {
    setIsSelectAll(checked);
    setCheckedRows(Array(rows.length).fill(checked));
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
  const toggleColumnVisibility = (column: "status" | "email" | "amount") => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className={styles['table-container']}>
      {/* Filter Input and Columns Button */}
      <div className={styles['filter-container']}>
        <input
          type="text"
          placeholder="Filter emails..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles['filter-input']}
        />
        <div className={styles['columns-dropdown-wrapper']}>
          <button
            className={styles['columns-dropdown-btn']}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Columns ▼
          </button>
          {isDropdownOpen && (
            <div className={styles['columns-dropdown']}>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.status}
                  onChange={() => toggleColumnVisibility("status")}
                  className="mr-2"
                />
                Status
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.email}
                  onChange={() => toggleColumnVisibility("email")}
                  className="mr-2"
                />
                Email
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={visibleColumns.amount}
                  onChange={() => toggleColumnVisibility("amount")}
                  className="mr-2"
                />
                Amount
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={styles['table-wrapper']}>
        <table className={styles['table']}>
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
              {visibleColumns.status && (
                <th className="p-2 border-b border-gray-700">Status</th>
              )}
              {visibleColumns.email && (
                <th className="p-2 border-b border-gray-700">Email</th>
              )}
              {visibleColumns.amount && (
                <th className="p-2 border-b border-gray-700">Amount</th>
              )}
              <th className="p-2 border-b border-gray-700">...</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-800"
              >
                <td className="p-2 border-b border-gray-700">
                  {/* Individual Checkbox */}
                  <input
                    type="checkbox"
                    className="accent-gray-600"
                    checked={checkedRows[index]}
                    onChange={(e) => handleRowCheckbox(index, e.target.checked)}
                  />
                </td>
                {visibleColumns.status && (
                  <td className="p-2 border-b border-gray-700">{row.status}</td>
                )}
                {visibleColumns.email && (
                  <td className="p-2 border-b border-gray-700">{row.email}</td>
                )}
                {visibleColumns.amount && (
                  <td className="p-2 border-b border-gray-700">
                    ${row.amount.toFixed(2)}
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
      <div className={styles['table-footer']}>
        <span>
          {checkedRows.filter((isChecked) => isChecked).length} of {rows.length} row(s) selected.
        </span>
      </div>
    </div>
  );
};

export default Table;
