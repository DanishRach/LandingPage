'use server'

import { snap } from "../lib/midtrans/transaction"
import prisma from "../lib/prisma"
import { revalidatePath } from "next/cache"

export async function transaction(formData: FormData) {
    try {
        const userID = String(formData.get('userID'))
        const layananID = String(formData.get('layananID'))


        const dataLayanan = await prisma.layanan.findUnique({
            where: {
                layananID: layananID
            }
        })
        const dataUser = await prisma.user.findUnique({
            where: {
                userID: userID
            }
        })

        const params = {
            transaction_details: {
                order_id: (Math.random() * 100) + 1,
                gross_amount: dataLayanan?.harga as number,
            },
            customer_details: {
                first_name: dataUser?.namaDepan,
                last_name: dataUser?.namaBelakang,
                email: dataUser?.email,
                phone: dataUser?.telp,
                address: dataUser?.alamat,
                city: dataUser?.kota,
                postal_code: dataUser?.kodePos,
                country_code: "IDN"
            },
            expiry: {
                unit: "minutes",
                duration: 10
            }
        };

        let tokenTrans = ''
        const respon = await snap.createTransaction(params)

        tokenTrans = respon.token

        await prisma.$disconnect()
        revalidatePath('/')
        return tokenTrans
        // return {
        //     result: data,
        //     success: 'success add project'
        // }
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
        // return {
        //     error: 'something wrong'
        // }
    }
}