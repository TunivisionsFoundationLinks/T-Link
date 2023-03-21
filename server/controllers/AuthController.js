import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {google} from "googleapis";

import createToken from "../middleware/CreateToken.js";
// Register new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { email } = req.body;
  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Register new admin account
export const registerUserAdmin = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { email } = req.body;
  const { Chapter } = req.body.Chapter;
  const { role } = req.body.role;

  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const reservedChapter = await UserModel.findOne({
      Chapter: Chapter,
    });

    const reservedRole = await UserModel.findOne({
      role: role,
    });
    if (!reservedChapter && !reservedRole)
      return res.status(400).json({ message: "Role already reserved !!" });

    // changed
    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).send({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// Changed
export const loginUserAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user.isAdmin === true) {
      if (user) {
        const validity = await bcrypt.compare(password, user.password);

        if (!validity) {
          res.status(400).json("wrong password");
        } else {
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1h" }
          );
          res.status(200).send({ user, token });
        }
      } else {
        res.status(404).json("password not correct");
      }
    } else {
      res.status(404).json("you don't have access to this page");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// for get passwords and sending mail



/*  

  espace acadmie (5 formation : scoring)
  espace formation fyh les formations
  profil cv 
  meeting 
  
*/


export const sendEmails = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });


 const accessToken = new Promise((resolve, reject) => {
   oAuth2Client.getAccessToken((err, accessToken) => {
     if (err) reject(err);
   resolve(accessToken);});

 })

 // email config
 try {
   const transporter = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     port: 587,
     secure: false,
     auth: {
       type: 'OAuth2',
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken: process.env.REFRESH_TOKEN,
       accessToken: accessToken,
       user: process.env.EMAIL,
       pass: process.env.EMAIL_PASSWORD,
     },
   });

   const mailOptions = {
     from: process.env.EMAIL,
     to: req.body.email,
     subject : "TLINK well be deployed soon",
     text: "message from email",
     html : "<h1>hello every One guess how's back</h1>"
   };

   const info = await transporter.sendMail(mailOptions);

   return res.status(200).json(info);
 } catch (error) {
   return res.status(400).json(error);
 }
};


export const sendLinkReset = async (to, url, text,name) => {

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });


 const accessToken = new Promise((resolve, reject) => {
   oAuth2Client.getAccessToken((err, accessToken) => {
     if (err) reject(err);
   resolve(accessToken);});

 })

 // email config
 try {
   const transporter = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     port: 587,
     secure: false,
     auth: {
       type: 'OAuth2',
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken: process.env.REFRESH_TOKEN,
       accessToken: accessToken,
       user: process.env.EMAIL,
       pass: process.env.EMAIL_PASSWORD,
     },
   });

   const mailOptions = {
     from: process.env.EMAIL,
     to: to,
     subject : "Reset Password",
     text: text,
     html : `
     <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <link
         href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
         rel="stylesheet"
       />
       <title>Passioncorners | Account Activation</title>
       <style>
         body {
           background-color: #333333;
           height: 100vh;
           font-family: "Roboto", sans-serif;
           color: #fff;
           position: relative;
           text-align: center;
         }
         .container {
           max-width: 700px;
           width: 100%;
           height: 100%;
           margin: 0 auto;
         }
         .wrapper {
           padding: 0 15px;
         }
         .card {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 100%;
         }
         span {
           color: #ffc107;
         }
         button {
           padding: 1em 6em;
           border-radius: 5px;
           border: 0;
           background-color: hsl(45, 100%, 51%);
           transition: all 0.3s ease-in;
           cursor: pointer;
         }
         button:hover {
           background-color: hsl(45, 70%, 51%);
           transition: all 0.3s ease-in;
         }
         .spacing {
           margin-top: 5rem;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="wrapper">
           <div class="card">
             <h1><span>Hey</span> ${name}</h1>
             <p>Please click the button below to reset your password. 🙂</p>
             <a href=${url}><button>${text}</button></a>
             <p class="spacing">
               If the button above does not work, please navigate to the link
               provided below 👇🏻
             </p>
             <div>${url}</div>
           </div>
         </div>
       </div>
     </body>
     </html>
   `
   };

   const info = await transporter.sendMail(mailOptions);
 
   return  res.status(200).json(info);
 } catch (error) {
  return  res.status(400).json(error);
 }
};


// for get passwords and sending mail
export const ForgotPassword = async (req,res)=> {
 try {
   // get email
   const { email } = req.body;

   // check email
   const user = await UserModel.findOne({ email });
   if (!user)
     return res
       .status(400)
       .json({ msg: "This email is not registered in our system." });


       const token = jwt.sign(
         { email: user.email, id: user._id },
         process.env.JWTKEY,
         { expiresIn: "1h" }
       );
       // res.status(200).send({ user, token });
   // create ac token
   const ac_token = createToken.access({ id: user._id });

   // send email
   const url = `http://localhost:5000/auth/forget-password/${user._id}/${ac_token}`;
   const name = user.firstname+ " "+user.lastname;
   const sended = sendLinkReset(email, url, "Reset your password", name);

   // success
  return res
     .status(200)
     .json({ msg: "Re-send the password, please check your email." });
 } catch (err) {
  return res.status(500).json({ msg: err.message });
 }
}

export const ResetPassword = async (req, res) => {

  try {
    // get password
    const { password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    // update password
    await UserModel.findOneAndUpdate(
      { _id: req.userid },
      { password: hashPassword }
    );

    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}