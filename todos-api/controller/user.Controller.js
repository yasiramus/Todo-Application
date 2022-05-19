const bcrypt = require("bcrypt"); //requirng  the bcrypt which is use for hashing the password

const verifyCookie = require("jsonwebtoken"); //jsonwebtoken

const { v4: uuidv4 } = require("uuid"); //requirin the uuid version 4 using CommonJS syntax:

const nodemailer = require("nodemailer"); //nodemailer

const { User } = require("../model/user"); //requirng the User model using the destructing form

// requiring the generateToken function
const { generateToken, getErrors } = require("../helper/gettoken");

// sending or saving data to the database using the signUp
const sendData = async (req, res) => {
  try {
    const { firstName, lastName, otherName, email, password } = req.body;

    const Data = {
      firstName,
      lastName,
      otherName,
      email,
      password,
    };

    const saveData = await User(Data).save(); //save data

    res.status(201).json(saveData._id); // returns a user id
  } catch (error) {
    console.log(error.errors, " : error handling");

    // handling error for each input field when the user try submitting without entering details
    //     // the question mark is use to prevent the undefined of cant read properties when the use type in the input field
    if (error?.errors?.firstName?.properties?.path === "firstName") {
      res.status(400).json(error.errors.firstName.properties.message);
    } else if (error?.errors?.lastName?.properties?.path === "lastName") {
      res.status(400).json(error.errors.lastName.properties.message);
    } else if (error?.errors?.email?.properties?.path === "email") {
      res.status(400).json(error.errors.email.properties.message);
    } else if (error?.errors?.password?.properties?.path === "password") {
      res.status(403).json(error.errors.password.properties.message);
    }
    // duplicate email error
    else if (error.code === 11000) {
      return res.status(409).json(error);
    } else {
      res.status(422).json(error); // all error
    }

    // calling the get error function
    // if (error.errors) {
    //     console.log(getErrors(error.errors))
    //     res.status(422).json(getErrors(error.errors))
    // }

    //  res.status(422).json(error)//this sending all error message to thefrontend
  }
};

// sending or saving data to the database using the logIn
const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); //finding a user using the registered email when signing up

    //if user exit
    if (user) {
      const matches = await bcrypt.compare(password, user.password); //compare the current password to the registered password

      // if password matches
      if (matches) {
        // passing the user id to the generateToken function
        const token = generateToken(user._id);

        // setting cookie for subsequent request
        // httpOnly prevent an intruder from accessing the cookie using javaScript and also
        // the httpOnly here means the cooking should only be access when a request is sent using only http
        res.cookie("userAdmin", token, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

        res.status(201).json({ matches: user._id }); //matches:user._id returns the user id that is if the password and email matches
      } else {
        // error message for password
        console.log("incorrect password");
        res.status(401).json("incorrect password");
      }
    } else {
      // error message for both password and email
      // the status code 403 means forbidden
      res.status(400).json({ errors: "Authentication failed" });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// logout
const logOut = (req, res) => {
  try {
    res.cookie("userAdmin", "", { maxAge: -1 }); //remove cookie and replace it with empty string

    res.sendStatus(200); //status code
  } catch (error) {
    console.log(error);
  }
};

// populating of all todos within the user model
const populateTodo = async (req, res) => {
  try {
    const { id } = req.params; //setting of id

    // populating of todo using the user id
    const todo = await User.findById(id).populate("todos");

    todo
      ? res.status(200).json(todo)
      : res.status(500).json("sorry no user with such id " + id);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// password reset
const resetPassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    //setting the cookies
    const cookie = req.cookies.userAdmin;

    // checking for the presence of the cookies
    if (cookie) {
      verifyCookie.verify(
        cookie,
        process.env.JWT_SECRET,
        async (err, cookiePresent) => {
          //if occur during the process of varify for the presence of the token
          if (err) {
            return res.status(403).json(err);
          } else {
            //   find a user using its id, the one gotten from the cookie
            const user = await User.findOne({ _id: cookiePresent.id });

            //   comparing the current password to save password in the database
            //   the password is the current password
            const passwordMatches = await bcrypt.compare(
              password,
              user.password
            );

            // if the current password dont match to the one the user used during registration
            if (!passwordMatches) {
              return res.status(401).json("incorrect old password");
            }

            //   if the newpassword field is empty
            else if (!newPassword) {
              return res.sendStatus(400);
            }

            //   if the password matches it should excute the code within the else block
            else {
              const salt = await bcrypt.genSalt(12); //generate the salt

              const hashedNewPassword = await bcrypt.hash(newPassword, salt); //hash the new password

              // this is another way for generating salt and hasing of password
              // const hashedNewPassword = await bcrypt.hash(newPassword, 12);

              // comparing the new password tothe old password
              const oldMatches = await bcrypt.compare(
                newPassword,
                user.password
              );

              // if new password matches with the old password
              if (oldMatches) {
                res.status(422).json("usage of previous password not allowed");
              }

              // if the new password dont match with old password it should go ahead
              //  to excute the code within the else block
              else {
                //update the password to the new password
                const updatePassword = await User.findByIdAndUpdate(
                  user._id,
                  { password: hashedNewPassword },
                  { new: true } //the new means it should return a new value
                );

                // this work in the same manner as the previous one
                // // const updatePassword = await User.findByIdAndUpdate(
                //     { _id: cookiePresent.id },
                //     { password: hashedNewPassword },
                //     { new: true }//the new means it should return a new value
                //   );

                // delete cookie after password update
                if (updatePassword) {
                  res.cookie("userAdmin", "", { maxAge: -1 });

                  return res
                    .status(201)
                    .json({ message: "password has been change successfully" });
                }
              }
            }
          }
        }
      );
    } else {
      return res.status(500).json("cookie not found"); //404 means not found
    }
  } catch (error) {
    console.log("changepassword", error);

    return res.status(402).json(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.params; //email as params

    const resetToken = uuidv4(); //the uuidv4 is use for generating random strings

    const updateUserToken = await User.findOneAndUpdate(
      { email },
      { resetToken },
      { new: true }
    );

    // if email doent exit
    if (!updateUserToken) {
      return res.status(401).json("email not found");
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASSCODE, //password generated from gmail security signing in mail
        },
      });

      const mailingOptions = {
        from: "some@gmail.com",
        to: `${email}`,
        subject: "Todo Password Reset",
        text: `Click this link to reset password : http://localhost:3000/forgotpassword/${resetToken}`,
        replyTo: "some@gmail.com",
      };

      const request = await transporter.sendMail(mailingOptions);

      console.log("req", request);

      res.send("check your email for link");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//  resetForgottenPassword
const resetForgottenPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;

    const { newPassword } = req.body;

    const hashedNewPassword = await bcrypt.hash(newPassword, 12); //hashing of new password

    // find user using the resettoken, update the old pasword to the new password
    await User.findOneAndUpdate(
      { resetToken },
      { password: hashedNewPassword },
      { new: true }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

// exportation of variables declared
module.exports = {
  sendData,
  userLogIn,
  populateTodo,
  resetPassword,
  forgotPassword,
  resetForgottenPassword,
  logOut,
};
