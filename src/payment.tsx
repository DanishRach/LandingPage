import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, price, features } = location.state || {
    name: "Unknown Plan",
    price: 0,
    features: [],
  };

  const [showNotification, setShowNotification] = useState(false);

  // Handle form submission
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Show notification
    setShowNotification(true);

    // Hide notification and navigate back after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
      navigate("/?"); // Replace with the route to your transactions page
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-blue-700 text-white relative">
      {/* Notification */}
      <CSSTransition
        in={showNotification}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black px-8 py-4 rounded-lg shadow-lg text-lg font-bold animate-bounce">
            Pembayaran Berhasil!
          </div>
        </div>
      </CSSTransition>

      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-blue-700 px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm bg-gray-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          ← Kembali
        </button>
        <h2 className="text-2xl font-bold mb-2">Langganan untuk {name}</h2>
        <p className="text-lg text-gray-300 mb-8">Per-Bulan</p>

        {/* Price */}
        <div className="text-4xl font-bold mb-4">
          Rp {price.toLocaleString("id-ID")}
        </div>

        {/* Details */}
        <ul className="space-y-4 mb-8">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-purple-300">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Total */}
        <div className="border-t border-purple-500 pt-4 mt-4">
          <p className="text-lg">Total due today</p>
          <div className="text-2xl font-bold">
            Rp {price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white px-8 py-12 text-gray-700">
        {/* Payment Form */}
        <form className="space-y-4" onSubmit={handlePayment}>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-600"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">No. Telepon</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg"
              placeholder="0812 3456 7890"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Card information</label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="w-2/3 p-3 border rounded-lg"
                  placeholder="1234 1234 1234 1234"
                  required
                />
                <input
                  type="text"
                  className="w-1/3 p-3 border rounded-lg"
                  placeholder="CVC"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="w-1/2 p-3 border rounded-lg"
                  placeholder="Bulan / Tahun"
                  required
                />
                <input
                  type="text"
                  className="w-1/2 p-3 border rounded-lg"
                  placeholder="Nama Pemegang Kartu"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Nama Jalan"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Provinsi</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Jawa Barat"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Kota</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Bandung"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;