
import nodemailer from "nodemailer"

export const trasnporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'musecloud7@gmail.com',
        pass: 'atgn txar skio rpum'
    }
})
