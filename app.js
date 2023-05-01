console.log("APP is started");

import smtp from "nodemailer-smtp-transport";
import nodemailer from "nodemailer";
import * as env from "dotenv";

env.config({ path: ".env" });

let transporter = nodemailer.createTransport(
  smtp({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  })
);

async function sendEmail(input) {
  const { toMail, message, subject } = input;
  let result = await transporter.sendMail(
    {
      from: "Mail Sender App",
      to: toMail,
      subject: subject,
      text: message,
    },
    function (error, info) {
      if (error) {
        console.log("Email couldn't be sent");
        console.log({ error });
        return;
      }
      if (info) {
        console.log({ info });
        console.log("Email is sent successful");
      }
    }
  );
}

let input = {
  toMail: "balajiduraisamyofficial@gmail.com",
  subject: "Happy New Year",
  message: "Welcome to my channel, https://www.Youtube.com/balajiduraisamy",
};

console.log("Calling mailer");
sendEmail(input);
