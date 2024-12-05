'use server';

import { trasnporter } from "@/lib/nodemailer"

export async function mail(subject: string, username: string, email: string, layanan: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamham@gmail.com",
            to: 'nurhidayahayundira296@gmail.com',
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