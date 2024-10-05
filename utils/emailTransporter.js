import nodemailer from "nodemailer";
import environment from "../config/environment.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: environment.email,
    pass: environment.pass,
  },
});

export default transporter;
