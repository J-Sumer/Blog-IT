const AWS = require("aws-sdk");

// Amazon SES configuration
const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

var params = {
  Source: process.env.EMAIL_FROM,
  Destination: {
    ToAddresses: [process.env.EMAIL_TO],
  },
  ReplyToAddresses: [process.env.EMAIL_FROM],
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "IT IS <strong>WORKING</strong>!",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Node + SES Example",
    },
  },
};

exports.register = (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then((res) => {
      console.log(res);
    });

  res.send(req.body);
};
