"use client";

import React, { useEffect, useState } from "react";
import { Layanan } from "./layanan";
import styles from "./adminLayanan.module.scss";
import { layananProps } from "../../../../../types/types";
import { toast } from "sonner";
import { addBundle, deleteBundle, editBundle } from "@/api/bundle";

interface uiProps {
  layananData: layananProps[] | undefined;
}

export default function Ui({ layananData }: uiProps) {
  const [formData, setFormData] = useState<layananProps>({
    layananID: "",
    judul: "",
    harga: 0,
    services: [],
  });
  const [addServices, setAddServices] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (layanan: layananProps) => {
    setFormData(layanan);
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (layananID: string) => {
    try {
      const formData = new FormData();
      if (layananID) formData.append("layananID", layananID);
      const result = await deleteBundle(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
    } catch (err) {
      console.log(err);
      toast.error("something wrong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      if (formData.layananID) form.append("layananID", formData.layananID);
      if (formData.judul) form.append("judul", formData.judul);
      if (formData.harga) form.append("harga", String(formData.harga));
      if (formData.services && formData.services.length > 0) {
        formData.services.forEach((service) => {
          form.append("services", service); // Append each service as a separate entry
        });
      }
      if (isEditing) {
        const result = await editBundle(form);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.success);
        }
      } else {
        const result = await addBundle(form);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.success);
        }
      }
      setFormData({ layananID: "", judul: "", harga: 0, services: [] });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("something wrong");
    }
  };

  const handleAddService = () => {
    // Prevent adding empty services and trim whitespace
    if (addServices.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        services: [...prevFormData.services, addServices],
      }));
      setAddServices(""); // Clear the input after adding
    }
  };

  const handleDeleteService = (serviceToDelete: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      services: prevFormData.services.filter(
        (service) => service !== serviceToDelete
      ),
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Services</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className="grid gap-6">
          <input
            type="hidden"
            name="layananID"
            value={formData.layananID}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.input2}>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Enter Service Title"
              className={styles.input}
              required
            />
          </div>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Enter Price"
            className={styles.input}
            required
          />
          <div>
            <p className="mb-2 font-medium">Services</p>
            <ul>
              {formData.services.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item}
                  <button
                    type="button"
                    className={styles["remove-button"]}
                    onClick={() => handleDeleteService(item)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={styles["input-container"]}>
              <input
                type="text"
                name="addServices"
                value={addServices}
                onChange={(e) => setAddServices(e.target.value)}
                placeholder="Add a service"
                className={styles.input}
              />
              <button
                type="button"
                className={styles["add-button"]}
                onClick={handleAddService}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          {isEditing ? "Update Service" : "Add Service"}
        </button>
      </form>

      <h2 className={styles.listTitle}>Service List</h2>
      <div className={styles.cardContainer}>
        {layananData &&
          layananData.map((item) => (
            <div key={item.layananID} className={styles.card}>
              <h3>{item.judul}</h3>
              <p>Price: Rp {item.harga.toLocaleString()}</p>
              <p>Services</p>
              <ul>
                {item.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
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
}
