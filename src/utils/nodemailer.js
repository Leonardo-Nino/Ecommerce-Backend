import 'dotenv/config'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.NODEMAILER_CREDENTIAL,
    pass: process.env.NODEMAILER_PASS,
  },
})
