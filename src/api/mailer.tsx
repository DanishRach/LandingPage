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

export async function mailCustomer(nama: string, email: string, layanan: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Pesanan Anda Telah Diterima!",
            text: `Yth. ${nama}

                    Terima kasih atas pesanan Anda untuk layanan cloud tier ${layanan} pada domain"${namaDomain}.${domain.toLocaleLowerCase()}". Pesanan Anda telah kami terima dan sedang kami proses.

                    Anda akan segera menerima email konfirmasi lebih lanjut setelah layanan Anda aktif.

                    Terima kasih,

                    PT. Inovasi Utama Nusantara
                    `,
            html: `
                    <p>
                    Yth. ${nama},
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas pesanan Anda untuk layanan cloud tier ${layanan} pada 
                    domain"${namaDomain}.${domain.toLocaleLowerCase()}". Pesanan Anda telah kami terima dan sedang kami proses.
                    </p>
                        <br></br>
                    <p>
                    Anda akan segera menerima email konfirmasi lebih lanjut setelah layanan Anda aktif.
                    </p>
                        <br></br>
                    <p>
                    Terima kasih,
                    </p>
                        <br></br>
                    <p>
                    PT. Inovasi Utama Nusantara
                    </p>
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

export async function notif5Hari(nama: string, email: string, namaDomain: string, domain: string, tenggat: Date) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Pengingat: Pembayaran Tagihan Jasa Cloud Anda",
            text: `Yth. ${nama}

                    Ini adalah pengingat bahwa tagihan jasa cloud Anda dengan nama domain ${namaDomain}.${domain.toLocaleLowerCase()} 
                    akan jatuh tempo dalam 5 hari ke depan, yaitu pada tanggal ${new Date(tenggat).toLocaleDateString()}.

                    Untuk menghindari gangguan pada layanan Anda, mohon segera melakukan pembayaran.

                    Terima kasih atas perhatiannya.

                    PT. Inovasi Utama Nusantara
                    `,
            html: `
                    <p>
                    Yth. ${nama},
                    </p>
                        <br></br>
                    <p>
                    Ini adalah pengingat bahwa tagihan jasa cloud Anda dengan nama domain ${namaDomain}.${domain.toLocaleLowerCase()} 
                    akan jatuh tempo dalam 5 hari ke depan, yaitu pada tanggal ${new Date(tenggat).toLocaleDateString()}.
                    </p>
                        <br></br>
                    <p>
                    Untuk menghindari gangguan pada layanan Anda, mohon segera melakukan pembayaran.
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas perhatiannya.
                    </p>
                        <br></br>
                    <p>
                    PT. Inovasi Utama Nusantara
                    </p>
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


export async function notifTenggat(nama: string, email: string, namaDomain: string, domain: string, tenggat: Date, total: number) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Tindakan Dituntut: Tagihan Jasa Cloud Anda Jatuh Tempo Hari Ini",
            text: `Yth. ${nama}

                    Kami ingin mengingatkan Anda bahwa tagihan untuk layanan cloud Anda dengan  nama domain ${namaDomain}.${domain.toLocaleLowerCase()}
                    akan jatuh tempo hari ini, ${new Date(tenggat).toLocaleDateString()}. Total tagihan yang harus dibayarkan adalah Rp.${total.toLocaleString('id-ID')}.

                    Untuk menghindari gangguan pada layanan Anda, mohon segera melakukan pembayaran 

                    Terima kasih atas perhatiannya.

                    PT. Inovasi Utama Nusantara
                    `,
            html: `
                    <p>
                    Yth. ${nama},
                    </p>
                        <br></br>
                    <p>
                    Kami ingin mengingatkan Anda bahwa tagihan untuk layanan cloud Anda dengan  nama domain ${namaDomain}.${domain.toLocaleLowerCase()}
                    akan jatuh tempo hari ini, ${new Date(tenggat).toLocaleDateString()}. Total tagihan yang harus dibayarkan adalah Rp.${total.toLocaleString('id-ID')}.
                    </p>
                        <br></br>
                    <p>
                    Untuk menghindari gangguan pada layanan Anda, mohon segera melakukan pembayaran 
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas perhatiannya.
                    </p>
                        <br></br>
                    <p>
                    PT. Inovasi Utama Nusantara
                    </p>
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

export async function mailCustomerPay(nama: string, email: string, layanan: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: `Pembayaran Tagihan Domain ${namaDomain}.${domain.toLocaleLowerCase()} Telah Diterima`,
            text: `Yth. ${nama}

                    Terima kasih atas pembayaran tagihan bulanan untuk domain ${namaDomain}.${domain.toLocaleLowerCase()}. 
                    Pembayaran Anda telah kami terima.

                    Hormat kami,

                    PT. Inovasi Utama Nusantara
                    `,
            html: `
                    <p>
                    Yth. ${nama},
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas pembayaran tagihan bulanan untuk domain ${namaDomain}.${domain.toLocaleLowerCase()}. 
                    Pembayaran Anda telah kami terima.
                    </p>
                        <br></br>
                    <p>
                    Hormat kami,
                    </p>
                        <br></br>
                    <p>
                    PT. Inovasi Utama Nusantara
                    </p>
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

export async function mailChangeOnWaiting(nama: string, email: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Perubahan Status Pesanan",
            text: `Hai ${nama},

                    Kami ingin memberi tahu kamu bahwa ada perubahan pada pesananmu dengan domain ${namaDomain}.${domain.toLocaleLowerCase()}. Saat ini, status pesananmu berubah menjadi "On Waiting".
                    Kami mohon maaf atas keterlambatan ini dan akan segera memproses pesananmu. Kamu akan kami beri kabar terbaru saat pesananmu sudah siap di deploy.

                    Terima kasih atas pengertiannya.

                    Salam hangat,
                      PT. Inovasi Utama Nusantara`,
            html: `
                    <p>
                    Hai ${nama},
                    </p>
                        <br></br>
                    <p>
                    Kami ingin memberi tahu kamu bahwa ada perubahan pada pesananmu dengan dengan domain ${namaDomain}.${domain.toLocaleLowerCase()}. Saat ini, status pesananmu berubah menjadi "On Waiting".
                    Kami mohon maaf atas keterlambatan ini dan akan segera memproses pesananmu. Kamu akan kami beri kabar terbaru saat pesananmu sudah siap dikirim.
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas pengertiannya.
                    </p>
                        <br></br>
                    <p>
                    Salam hangat,
                    </p>
                    <br></br>
                    <p>
                      PT. Inovasi Utama Nusantara
                    </p>
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

export async function mailChangeOnProgress(nama: string, email: string, namaDomain: string, domain: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Pesanan Anda Sedang Kami Proses!",
            text: `Hai ${nama},

                    Senang sekali memberi tahu kamu bahwa pesananmu dengan domain ${namaDomain}.${domain.toLocaleLowerCase()} sudah mulai kami proses!
                    Kamu akan segera menerima kabar terbaru mengenai pengiriman.

                    Terima kasih,
                      PT. Inovasi Utama Nusantara`,
            html: `
                    <p>
                    Hai ${nama},
                    </p>
                        <br></br>
                    <p>
                    Senang sekali memberi tahu kamu bahwa pesananmu dengan domain ${namaDomain}.${domain.toLocaleLowerCase()} sudah mulai kami proses!
                    Kamu akan segera menerima kabar terbaru mengenai pengiriman.
                    </p>
                        <br></br>
                    <p>
                    Terima kasih,
                    </p>
                    <br></br>
                    <p>
                      PT. Inovasi Utama Nusantara
                    </p>
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

export async function mailChangeFinish(nama: string, email: string, namaDomain: string, domain: string, linkDeploy: string) {
    try {
        await trasnporter.sendMail({
            from: "pertamaham@gmail.com",
            to: email,
            subject: "Pesanan Anda Telah Selesai!",
            text: `Hai ${nama},

                   Kami dengan senang hati menginformasikan bahwa pesanan Anda 
                   dengan domain ${namaDomain}.${domain.toLocaleLowerCase()} telah selesai diproses. Anda dapat melihat 
                   website anda di ${linkDeploy} 

                    Terima kasih atas kepercayaan Anda,
                      PT. Inovasi Utama Nusantara`,
            html: `
                    <p>
                    Hai ${nama},
                    </p>
                        <br></br>
                    <p>
                    Kami dengan senang hati menginformasikan bahwa pesanan Anda 
                   dengan domain ${namaDomain}.${domain.toLocaleLowerCase()} telah selesai diproses. Anda dapat melihat 
                   website anda di ${linkDeploy}  
                    </p>
                        <br></br>
                    <p>
                    Terima kasih atas kepercayaan Anda,
                    </p>
                    <br></br>
                    <p>
                      PT. Inovasi Utama Nusantara
                    </p>
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