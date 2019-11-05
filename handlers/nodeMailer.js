const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").load;

// oath client setup
const oauth2Client = new OAuth2(
  `${process.env.SECRET_CID}`,
  `${process.env.SECRET_CS}`,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: `${process.env.SECRET_RT}`
});
const accessToken = oauth2Client.getAccessToken()

exports.sendMail = (req, res, next) => {
  // node mailer set up
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "aaron.a.macken@gmail.com",
      clientId: `${process.env.SECRET_CID}`,
      clientSecret: `${process.env.SECRET_CS}`,
      refreshToken: `${process.env.SECRET_RT}`,
      accessToken: accessToken
    },
    debug: false,
    logger: true
  });

  // send email via node mailer
  const message = {
    from: "aaron.a.macken@gmail.com", // Sender address
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
