import React, { useState } from "react";
import { TableRow } from "./types";

interface TableProps {
  rows: TableRow[];
}

const Table: React.FC<TableProps> = ({ rows }) => {
  const [filter, setFilter] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<boolean[]>(Array(rows.length).fill(false));
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState({
    status: true,
    email: true,
    amount: true,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  const toggleColumnVisibility = (column: "status" | "email" | "amount" ) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="bg-black text-white rounded-lg p-4 w-full max-w-4xl">
      {/* Filter Input and Columns Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter emails..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white w-1/3"
        />
        <div className="relative">
          <button
            className="p-2 bg-gray-700 text-sm rounded"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Columns ▼
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg p-2 w-40">
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
      <div className="overflow-auto max-h-[70vh]">
        <table className="w-full text-left border-collapse">
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
      <div className="mt-4 text-sm text-gray-500">
        <span>
          {checkedRows.filter((isChecked) => isChecked).length} of {rows.length} row(s) selected.
        </span>
      </div>
    </div>
  );
};

export default Table;
