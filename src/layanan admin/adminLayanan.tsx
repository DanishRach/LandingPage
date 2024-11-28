import React, { useEffect, useState } from "react";
import { Layanan } from "./layanan";
import {
  getLayananList,
  addLayanan,
  updateLayanan,
  deleteLayanan,
} from "./layananServices";

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
    <div className="p-8 min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Kelola Layanan</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid gap-6">
          <input
            type="text"
            name="layananID"
            value={formData.layananID}
            onChange={handleChange}
            placeholder="ID Layanan"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul Layanan"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Harga"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            placeholder="Deskripsi Layanan"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="Domain"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            placeholder="User ID"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          {isEditing ? "Update Layanan" : "Tambah Layanan"}
        </button>
      </form>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Daftar Layanan</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {layanan.map((item) => (
          <div
            key={item.layananID}
            className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500 hover:border-pink-500 transition"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">{item.judul}</h3>
            <p className="text-lg text-gray-500 mb-4">Harga: Rp {item.harga.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">{item.services}</p>
            <p className="text-sm text-gray-600">Domain: {item.domain}</p>
            <p className="text-sm text-gray-600">User ID: {item.userID}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.layananID)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLayanan;
