const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

//login controller 
const login = require('../controllers/loginController')
router.post("/loginSendOtp", login.generateOtp)
router.post("/loginVerify", login.verifyOTP)

// user controller
const user = require('../controllers/userController')
router.post("/addUser", auth, user.addUser)
router.get("/getUser", auth, user.getUser)

// card controller
const card = require('../controllers/cardController')

// bank controller
const bank = require('../controllers/bankController')
router.post("/addBank", auth, bank.addBank)
router.get("/getBank", auth, bank.getBank)

module.exports = router;