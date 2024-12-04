import midtransClient from "midtrans-client"

export const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_SERVER,
    clientKey: process.env.NEXT_PUBLIC_CLIENT

})