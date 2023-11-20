const usercomp = require("../models/complaintSchema");
const nodemailer = require("nodemailer");

const intervalInMilliseconds = 86400000;

setInterval(async () => {
  try {
    const unresolved = await usercomp.find({ resolved: false });
    let hello = unresolved.map((complaint) => {
      return `${complaint.fname}: ${complaint.complaint}`;
    });
    hello = hello.join("\n");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sudosusenpai@gmail.com",
        pass: "ffqd hwwr hgof oxax",
      },
    });

    //send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Sudosu Senpai👻" <sudosusenpai@gmail.com>',
      to: "vaibhav.dev.309@gmail.com",
      subject: "List of unresolved complaints",
      text: hello,
    });
    console.log("Email sent successfully");
  } catch (error) {
    throw error;
  }
}, intervalInMilliseconds);
