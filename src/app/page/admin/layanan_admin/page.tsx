"use client"

import React, { useEffect, useState } from "react";
import { Layanan } from "./layanan";
import { getLayananList, addLayanan, updateLayanan, deleteLayanan } from "./layananService";
import styles from './adminLayanan.module.scss';

const AdminLayanan: React.FC = () => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [formData, setFormData] = useState<Layanan>({
    layananID: "",
    judul: "",
    harga: 0,
    services: "",
    domain: "",
    userID: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getLayananList();
    setLayanan(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateLayanan(formData);
    } else {
      await addLayanan(formData);
    }
    setFormData({ layananID: "", judul: "", harga: 0, services: "", domain: "", userID: "" });
    setIsEditing(false);
    fetchData();
  };

  const handleEdit = (layanan: Layanan) => {
    setFormData(layanan);
    setIsEditing(true);
  };

  const handleDelete = async (layananID: string) => {
    await deleteLayanan(layananID);
    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kelola Layanan</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className="grid gap-6">
          <input
            type="text"
            name="layananID"
            value={formData.layananID}
            onChange={handleChange}
            placeholder="ID Layanan"
            className={styles.input}
            required
          />
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul Layanan"
            className={styles.input}
            required
          />
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Harga"
            className={styles.input}
            required
          />
          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            placeholder="Deskripsi Layanan"
            className={styles.textarea}
            required
          />
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="Domain"
            className={styles.input}
          />
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            placeholder="User ID"
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          className={styles.button}
        >
          {isEditing ? "Update Layanan" : "Tambah Layanan"}
        </button>
      </form>

      <h2 className={styles.listTitle}>Daftar Layanan</h2>
      <div className={styles.cardContainer}>
        {layanan.map((item) => (
          <div
            key={item.layananID}
            className={styles.card}
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">{item.judul}</h3>
            <p className="text-lg text-gray-500 mb-4">Harga: Rp {item.harga.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">{item.services}</p>
            <p className="text-sm text-gray-600">Domain: {item.domain}</p>
            <p className="text-sm text-gray-600">User ID: {item.userID}</p>
            <div className={styles.cardFooter}>
              <button
                onClick={() => handleEdit(item)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.layananID)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLayanan;
