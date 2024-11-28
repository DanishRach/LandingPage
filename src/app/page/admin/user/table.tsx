"use client";

import React, { useState, useEffect } from "react";
import styles from './page.module.scss'; // Import the SCSS file
import { userProps } from "../../../../../types/types";

interface TableProps {
  rows: userProps[] | undefined;
}

const Table: React.FC<TableProps> = ({ rows = [] }) => {
  const [filter, setFilter] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<boolean[]>(Array(rows.length).fill(false));
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState({
    userID: true, 
    email: true, 
    password: true, 
    telp: true,  
    namaDepan: true,  
    namaBelakang: true,  
    provinsi: true,  
    kota: true,  
    alamat: true,  
    kodePos: true,  
    role: true,
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
  const toggleColumnVisibility = (column: "userID"| "email"| "password"| "telp"|  "namaDepan"|  "namaBelakang"|  "provinsi"|  "kota"|  "alamat"|  "kodePos"|  "role") => {
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
                  checked={visibleColumns.namaDepan}
                  onChange={() => toggleColumnVisibility("namaDepan")}
                  className="mr-2"
                />
                Nama Depan
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={visibleColumns.namaBelakang}
                  onChange={() => toggleColumnVisibility("namaBelakang")}
                  className="mr-2"
                />
                Nama Belakang
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
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.telp}
                  onChange={() => toggleColumnVisibility("telp")}
                  className="mr-2"
                />
                telp
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.provinsi}
                  onChange={() => toggleColumnVisibility("provinsi")}
                  className="mr-2"
                />
                provinsi
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.kota}
                  onChange={() => toggleColumnVisibility("kota")}
                  className="mr-2"
                />
                kota
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.alamat}
                  onChange={() => toggleColumnVisibility("alamat")}
                  className="mr-2"
                />
                alamat
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.kodePos}
                  onChange={() => toggleColumnVisibility("kodePos")}
                  className="mr-2"
                />
                kodePos
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.role}
                  onChange={() => toggleColumnVisibility("role")}
                  className="mr-2"
                />
                role
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
              {visibleColumns.namaDepan && (
                <th className="p-2 border-b border-gray-700">Nama depan</th>
              )}
                {visibleColumns.namaBelakang && (
                  <th className="p-2 border-b border-gray-700">Nama Belakang</th>
                )}
              {visibleColumns.email && (
                <th className="p-2 border-b border-gray-700">Email</th>
              )}
              {visibleColumns.telp && (
                <th className="p-2 border-b border-gray-700">telp</th>
              )}
              {visibleColumns.provinsi && (
                <th className="p-2 border-b border-gray-700">provinsi</th>
              )}
              {visibleColumns.kota && (
                <th className="p-2 border-b border-gray-700">kota</th>
              )}
              {visibleColumns.alamat && (
                <th className="p-2 border-b border-gray-700">alamat</th>
              )}
              {visibleColumns.kodePos && (
                <th className="p-2 border-b border-gray-700">kodePos</th>
              )}
              {visibleColumns.role && (
                <th className="p-2 border-b border-gray-700">role</th>
              )}
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
                {visibleColumns.namaDepan && (
                  <td className="p-2 border-b border-gray-700">{row.namaDepan}</td>
                )}
                {visibleColumns.namaBelakang && (
                  <td className="p-2 border-b border-gray-700">{row.namaBelakang}</td>
                )}
                {visibleColumns.email && (
                  <td className="p-2 border-b border-gray-700">{row.email}</td>
                )}
                {visibleColumns.telp && (
                  <td className="p-2 border-b border-gray-700">{row.telp}</td>
                )}
                {visibleColumns.provinsi && (
                  <td className="p-2 border-b border-gray-700">{row.provinsi}</td>
                )}
                {visibleColumns.kota && (
                  <td className="p-2 border-b border-gray-700">{row.kota}</td>
                )}
                {visibleColumns.alamat && (
                  <td className="p-2 border-b border-gray-700">{row.alamat}</td>
                )}
                {visibleColumns.kodePos && (
                  <td className="p-2 border-b border-gray-700">{row.kodePos}</td>
                )}
                {visibleColumns.role && (
                  <td className="p-2 border-b border-gray-700">{row.role}</td>
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