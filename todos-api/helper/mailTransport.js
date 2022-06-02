const nodemailer = require("nodemailer");

const mailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSCODE,
    },
  });

  return transporter;
};

// const mailTransporte = () => nodemailer.createTransport({
//         service: "gmail",

//         auth: {
//             user: process.env.AUTH_USER,
//             pass: process.env.AUTH_PASSCODE,
//         }

//     });

const generateEmailTemplate = (firstName,code) => {
  return `

    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>

    <style>
      @media only screen and (max-width: 620px) {
        h1 {
          font-size: 20px;
          padding: 5px;
        }
      }
    </style>
  </head>

  <body>
  <div>
    <div
      style="
        max-width: 620px;
        margin: 0 auto;
        font-family: sans-sarif;
        color: #272727;
      "
    >
      <h1
        style="
          background-color: #f6f6f6;
          padding: 10px;
          text-align: center;
          color: 272727;
        "
      >
        Hi ${firstName},
      </h1>
      <h2>
        Are you ready to gain access to all of the assets we prepared for
        clients?
      </h2>
      <h3>If yes </h3>

      <p>
        First, you must complete your registration by entering the code below:
      </p>
      <p
        style="
          width: 80px;
          margin: 0 auto;
          font-weight: bold;
          text-align: center;
          background-color: #f6f6f6;
          border-radius: 5px;
          font-size: 25px;
        "
      >
        ${code}
      </p>

      <p>
        This code will enable you to verify your email address,
      </p>

      <p>See you there!</p>

      <p>Best regards,</p>

      <p> The Todo App team.</p>

    </div>

  </div>
  </body>
</html>

    `;
};

const welcomeMsg = (heading, message) => {
  return `

    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>

    <style>
      @media only screen and (max-width: 620px) {
        h1 {
          font-size: 20px;
          padding: 5px;
        }
      }
    </style>
  </head>

  <body>
  <div>
    <div
      style="
        max-width: 620px;
        margin: 0 auto;
        font-family: sans-sarif;
        color: #272727;
      "
    >
      <h1
        style="
          background-color: #f6f6f6;
          padding: 10px;
          text-align: center;
          color: 272727;
        "
      >
       ${heading}
      
      <p
        style="
          text-align: center;
          color: 272727;
        "
      >
        ${message}
      </p>

    </div>

  </div>
  </body>
</html>

    `;
};

module.exports = { mailTransporter, generateEmailTemplate, welcomeMsg };
