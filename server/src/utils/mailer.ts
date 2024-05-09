import config from "config";
import nodemailer from "nodemailer";
import log from "./logger";

// async function createTestCreds()
// {
//     const creds = await nodemailer.createTestAccount();
//     console.log({creds});
// }

// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: any) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error Sending email");
    }
    log.info(`Preview Url: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
