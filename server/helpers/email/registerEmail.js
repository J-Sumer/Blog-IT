const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

// Amazon SES configuration
const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

var paramsForRegisterMail = (token, email) => ({
  Source: process.env.EMAIL_FROM,
  Destination: {
    ToAddresses: [process.env.EMAIL_TO],
  },
  ReplyToAddresses: [process.env.EMAIL_FROM],
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
          <html>
            <body>
              <h1>Please click on the below link to authenticate </h1>
              <p>
                ${process.env.CLIENT_URL}/auth/activate/${token}
              </p>
            </body>        
          </html>
          `,
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Node + SES Example",
    },
  },
});

const sendEmailToRegister = (name, email, password) => {
  // Generate token with name, email and password
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUT_ACTIVATION,
    {
      expiresIn: "10m",
    }
  );

  // Send mail
  return new AWS.SES(SESConfig)
    .sendEmail(paramsForRegisterMail(token, email))
    .promise();

  // .then((res) => {
  //     console.log(res);
  //   });
};

module.exports = {
  sendEmailToRegister,
};
