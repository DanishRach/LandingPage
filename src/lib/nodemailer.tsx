
import nodemailer from "nodemailer"

export const trasnporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'pertamaham@gmail.com',
        pass: 'eayc aazt fljo vbou'
    }
})
