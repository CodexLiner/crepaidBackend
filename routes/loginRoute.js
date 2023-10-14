const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const otp = require("../models/otps");
const otps = require("../models/otps");
const mUser = require("../models/User");
const axios = require("axios");
const { response } = require("express");
const token_aa =
  "ffc52dcb17afedeb96226be0719b3b40b2f68ea4b605e7206e396c4044b8dd71";
// home route for login
const router = express.Router();

router.post("/verify", async (req, res) => {
  // send otp to number
  const mOtp = generateOTP();
  const user = { mobile: req.body.mobile, mOtp: otp };
  const token = jwt.sign(user, token_aa, { expiresIn: "60m" });
  if (otps.findById(req.body.mobile)) {
    await otps.deleteOne({ _id: req.body.mobile });
  }
  const otpSchema = new otp({
    mobile: req.body.mobile,
    code: mOtp,
    _id: req.body.mobile,
    lastToken: token,
  });
  try {
    const otpSaved = await otpSchema.save();
    await otpSender(req.body.mobile, mOtp);
    res.send(otpSaved);
  } catch (e) {
    console.log(e);
  }
});
async function otpSender(mobile, otp) {
  const API_URL = 'https://api.textlocal.in/send/?'
  const HEADER = 'GLMEEN'
  const OTP_TEMPLATE = 'is your OTP code PLEASE DO NOT SHARE WITH ANYONE From Gopal Meena'
  // console.log(stringMessage);
  try {
    const message = encodeURIComponent(`${otp} ${OTP_TEMPLATE}`);
    const apiUrl = `${API_URL}apikey=${'Nzc1OTczNDI3OTMyNDk0MzM4NjE0NDYzNTEzNDM3MzQ='}&numbers=91${mobile}&message=${message}&sender=${HEADER}`;
    const response = await axios.get(apiUrl);
    //if otp already exist in database 
    return response.data
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}
router.post("/validator", async (req, res) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  console.log(`the token is ${token}`);
  const userCode = req.body.code;
  if (token == null) res.sendStatus(401);
  jwt.verify(token, token_aa, async (err, user) => {
    if (err) {
      console.log(`the err is ${err}`);
      res.sendStatus(401);
    } else {
      const getOtp = await otps.findOne({ _id: req.body.mobile });
      if (userCode === getOtp.code) {
        const token = jwt.sign(req.body.mobile, token_aa);
        const inUser = await mUser.findOne({ _id: req.body.mobile });
        if (inUser != null && inUser._id === req.body.mobile) {
          console.log("user found");
          res.send({ token: token, status: 200, oldUser: true });
        } else {
          console.log("user not found");
          res.send({ token: token, status: 200, oldUser: false });
        }
      } else {
        res.sendStatus(406);
      }
    }
  });
});

router.post("/add_bank", auth, async (req, res) => {
  // res.json(req.mobile);
  // res.sendStatus(100);
  const user = new User({
    _id: req.mobile,
    name: req.body.mobiles,
    mobile: req.mobile,
    authkey: req.mobile + "-" + uuidv4(),
    panNumber: req.body.mobiles,
    dateBirth: req.body.mobiles,
  });
  try {
    const userCreated = await user.save();
    console.log(userCreated);
    res.json({ statusCode: true });
  } catch (e) {
    console.log(e);
  }
});

// get user details
router.get("/:mobile", async (req, res) => {
  const user = await User.findById(req.params.mobile);
  if (user == null) {
    res.sendStatus(404);
  } else {
    res.send(200);
  }
});
//functions
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  console.log(`the token is ${token}`);
  const userCode = req.body.code;
  if (token == null) res.sendStatus(401);
  jwt.verify(token, token_aa, async (err, user) => {
    if (err) {
      res.send(401);
    }
    req.mobile = user;
    next();
  });
}
// update user informatiion

//exporting routes
module.exports = router;
