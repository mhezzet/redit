import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "jnvgjdu7umpf323b@ethereal.email",
      pass: "yJsyXfeCU2vAMxkgGY",
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: "change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
