import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_PASSWORD, UKR_NET_EMAIL} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 887, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL,
    to: "ravolax819@pckage.com",
    subject: "Test nodemailer with ukr.net",
    html: "<strong>Test email</strong>"
};

transport.sendMail(email)
    .then(msg => console.log(msg))
    .catch(error => console.log(error));