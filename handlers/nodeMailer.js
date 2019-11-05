const nodemailer = require("nodemailer");
require("dotenv").load;

exports.sendMail = (req, res, next) => {
  // node mailer set up
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SECRET_U,
      pass: process.env.SECRET_P
    },
    debug: false,
    logger: true
  });

  // send email via node mailer
  const message = {
    from: req.body.messageData.email, // Sender address
    to: "aaron.a.macken@gmail.com", // List of recipients
    subject: `Devport Email from ${req.body.messageData.name} - ${req.body.messageData.email} at ${req.body.messageData.company}`, // Subject line
    text: req.body.messageData.message // Plain text body
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
