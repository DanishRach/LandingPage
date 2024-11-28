// models/Layanan.ts
export interface Layanan {
    userID: string | number | readonly string[] | undefined;
    domain: string | number | readonly string[] | undefined;
    layananID: string;
    judul: string;
    harga: number;
    services: string;
  }
  