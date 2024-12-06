'use server';

//akun hida = nurhidayahayundira296@gmail.com

import { trasnporter } from "@/lib/nodemailer"

export async function mailAdmin(subject: string, emailReciever:string, username: string, email: string, layanan: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: emailReciever,
            subject: subject,
            text: 'coba',
            html: `
                    <h1>penambahan data</h1>
                    <p>permisi Hida, maaf mengganggu. user dengan nama ${username} (email: ${email}) telah membeli layanan cloud tier ${layanan} dengan nama domain ${namaDomain} dan dengan domain ${domain}</p>
                    `
        })
        return {
            success: 'succes message'
        }
    } catch (err) {
        console.log('error in: ' + err)
        return {
            error: 'pengiriman pesan gagal'
        }
    }
}
export async function mailCustomer(subject: string, email: string, layanan: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: subject,
            text: 'coba',
            html: `
                    <h1>Pembayaran anda telah diterima</h1>
                    <p>pembelian anda untuk layanan cloud ${layanan} untuk nama domain ${namaDomain} dengan tipe ${domain} telah kami terima. terima kasih telah memepercayakan cloud dan keamanan webssite anda kepada kami</p>
                    `
        })
        return {
            success: 'succes message'
        }
    } catch (err) {
        console.log('error in: ' + err)
        return {
            error: 'pengiriman pesan gagal'
        }
    }
}

export async function mailChangeStatus(subject: string, email: string, namaDomain: string, status: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: subject,
            text: 'coba',
            html: `
                    <h1>Perubahan Status Project</h1>
                    <p>terjadi perubahan pada status project anda dengan nama ${namaDomain} menjadi ${(status).toLocaleLowerCase()} </p>
                    `
        })
        return {
            success: 'succes message'
        }
    } catch (err) {
        console.log('error in: ' + err)
        return {
            error: 'pengiriman pesan gagal'
        }
    }
}