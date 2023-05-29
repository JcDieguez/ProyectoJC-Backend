import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'hotmail',
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: 'juancruzdieguez95@hotmail.com',
        pass: 'Vickyteamo'
    },
    tls: {
        rejectUnauthorized: false
    }
});