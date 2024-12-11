import { Role, Status } from "@prisma/client"

export interface userProps {
    userID: string
    email: string
    password: string
    telp?: string | null
    namaDepan?: string | null
    namaBelakang?: string | null
    provinsi?: string | null
    kota?: string | null
    alamat?: string | null
    kodePos?: string | null
    role: Role
}

export interface projectProps {
    projectID: string
    namaDomain: string
    domain: string
    project: string
    sdhDeplo: Status,
    linkDeploy?: string | null,
    tagihan: number
    createdAt: Date
    tenggat: Date
    userID: string
    layananID: string
}

export interface layananProps {
    layananID: string
    judul: string
    harga: number
    services: string[]
}