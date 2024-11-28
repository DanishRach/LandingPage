// services/layananService.ts
import { Layanan } from "./layanan";

let layananData: Layanan[] = [
  {
      layananID: "1", judul: "Paket Premium", harga: 500000, services: "Domain, Hosting, Support 24/7",
      userID: undefined,
      domain: undefined
  },
  {
      layananID: "2", judul: "Paket Basic", harga: 250000, services: "Domain, Hosting",
      userID: undefined,
      domain: undefined
  },
  {
      layananID: "3", judul: "Paket Startup", harga: 100000, services: "Domain",
      userID: undefined,
      domain: undefined
  },
];

// Simulasi fungsi CRUD
export const getLayananList = async (): Promise<Layanan[]> => layananData;

export const addLayanan = async (layanan: Layanan): Promise<void> => {
  layananData.push({ ...layanan, layananID: (layananData.length + 1).toString() });
};

export const updateLayanan = async (layanan: Layanan): Promise<void> => {
  layananData = layananData.map((item) => (item.layananID === layanan.layananID ? layanan : item));
};

export const deleteLayanan = async (layananID: string): Promise<void> => {
  layananData = layananData.filter((item) => item.layananID !== layananID);
};