// const { isValidObjectId } = require("mongoose");

// const { User } = require("../model/user"); //requirng the User model using the destructing form

// const { generateOTP } = require("../helper/generateOTP");

// const { verifyToken } = require("../model/varifyToken");

// const { mailTransporter , generateEmailTemplate, welcomeMsg } = require("../helper/mailTransport");


// // sending or saving data to the database using the signUp without verify email
//  exports.sendDatas = async (req, res) => {
//   try {

//     const { firstName, lastName, otherName, email, password } = req.body;

//     const newUser = new User ( {
//         firstName,
//         lastName,
//         otherName,
//         email,
//         password,
//     });

//     const OTP = generateOTP();

//       const verificationToken = new verifyToken({

//           owner: newUser._id,
//           token: OTP

//       });


//       const tokenVerified = await verificationToken.save();
       
//       if (!tokenVerified) {

//           res.status(422).json("token not saved")

//       } else {

//           await newUser.save();

//           const newTransporter = mailTransporter();
          
//           newTransporter.sendMail({
//               from: "dummy@gmail.com",
//               to: `${newUser.email}`,
//               subject: "Verify your email account",
//               // html:`<h1>${OTP}</h1>`,
//               html: generateEmailTemplate(OTP),
//               replyTo: "dummy@gmail.com",
//           });

//           res.status(201).json(newUser._id); // returns a user id
//       }

//   } catch (error) {

//     console.log(error, " : error handling");

//     // handling error for each input field when the user try submitting without entering details
//     //     // the question mark is use to prevent the undefined of cant read properties when the use type in the input field
//     if (error?.errors?.firstName?.properties?.path === "firstName") {
//       res.status(400).json(error.errors.firstName.properties.message);
//     } else if (error?.errors?.lastName?.properties?.path === "lastName") {
//       res.status(400).json(error.errors.lastName.properties.message);
//     } else if (error?.errors?.email?.properties?.path === "email") {
//       res.status(400).json(error.errors.email.properties.message);
//     } else if (error?.errors?.password?.properties?.path === "password") {
//       res.status(403).json(error.errors.password.properties.message);
//     }
//     // duplicate email error
//     else if (error.code === 11000) {
//       return res.status(409).json(error);
//     } else {
//       res.status(422).json(error); // all error
//     }

//   }
// };


// exports.sendDatas = async (req, res) => {

//     try {
//         const { firstName, lastName, otherName, email, password } = req.body;

//         const newUser = new User ( {
//             firstName,
//             lastName,
//             otherName,
//             email,
//             password,
//         });

//         const OTP = generateOTP();

//         const verificationToken = new verifyToken({
//             owner: newUser._id,
//             token:OTP
//         })

//       await verificationToken.save();
       
//         await newUser.save();

//         mailTransporter().sendMail({
//             from: "dummy@gmail.com",
//             to: `${newUser.email}`,
//             subject: "Varify your email account",
//             // html:`<h1>${OTP}</h1>`,
//             html:generateEmailTemplate (OTP),
//             replyTo: "dummy@gmail.com",
//         })
        
//         res.send(newUser)

//     } catch (error) {
//         console.log(error);
//     }
   
// }

// exports.varifyEmail = async (req, res) => {
//     try {
        
//         // const { userId, OTP } = req.body; this also works

//         const { OTP } = req.body; //requesting the otp

//         // setting the id 
//         const { id } = req.params;
        
//         // if (!userId || !OTP.trim()) {
        
//         // if user doesnt provide the otp
//             if (!OTP.trim()) {
            
//             return res.status(401).json("Invalid request")
//         }
//         else {
//             // checking if the user id is not valid object id
//             // if (!isValidObjectId(userId)) {

//             if (!isValidObjectId(id)) {
                
//                 return res.status(401).json("Invalid user id")

//             } else {
//                 // const user = await User.findById(userId);

//                 const user = await User.findById(id);

//                 if (!user) {

//                     res.status(404).json("Sorry, user not found");

//                 } else if (user.varified) {
//                     res.status(401).json("This account has been varified already!")
//                 } else {
//                     const token = await verifyToken.findOne({ owner: user._id });
                    
//                     if (!token) {
//                         res.status(404).json("Sorry no user with this token")
//                     } else {
//                         const tokenMatched = await token.compareToken(OTP);
                        
//                         if (!tokenMatched) {
//                             res.status(422).json("Please provide a valid token")
//                         } else {
//                             user.varified = true;

//                             // delete otp after user has been varified

//                             await verifyToken.findByIdAndDelete(token._id);

//                             await user.save();

//                             mailTransporter().sendMail({
//                                 from: "dummy@gmail.com",
//                                 to: user.email,
//                                 subject: "Welcome email",
//                                 html:welcomeMsg("Email Verified Successfully", "Thanks for connecting with us."),
//                                 replyTo: "dummy@gmail.com",
//                             });

//                             res.status(201).json({
//                                 message: "your email has been verified",
//                                 user: { firstname: user.firstName }
//                             })
//                         }
//                     }
//                 }
//             }
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }




// sending or saving data to the database using the signUp without verify email
// const sendData = async (req, res) => {
//   try {
//     console.log('req.body',req.body);
//     const { firstName, lastName, otherName, email, password } = req.body;

//     const Data = {
//       firstName,
//       lastName,
//       otherName,
//       email,
//       password,
//     };

//     const saveData = await User(Data).save(); //save data

//     res.status(201).json(saveData._id); // returns a user id
//   } catch (error) {
//     console.log(error.errors, " : error handling");

//     // handling error for each input field when the user try submitting without entering details
//     //     // the question mark is use to prevent the undefined of cant read properties when the use type in the input field
//     if (error?.errors?.firstName?.properties?.path === "firstName") {
//       res.status(400).json(error.errors.firstName.properties.message);
//     } else if (error?.errors?.lastName?.properties?.path === "lastName") {
//       res.status(400).json(error.errors.lastName.properties.message);
//     } else if (error?.errors?.email?.properties?.path === "email") {
//       res.status(400).json(error.errors.email.properties.message);
//     } else if (error?.errors?.password?.properties?.path === "password") {
//       res.status(403).json(error.errors.password.properties.message);
//     }
//     // duplicate email error
//     else if (error.code === 11000) {
//       return res.status(409).json(error);
//     } else {
//       res.status(422).json(error); // all error
//     }

//     // calling the get error function
//     // if (error.errors) {
//     //     console.log(getErrors(error.errors))
//     //     res.status(422).json(getErrors(error.errors))
//     // }

//     //  res.status(422).json(error)//this sending all error message to thefrontend
//   }
// };
