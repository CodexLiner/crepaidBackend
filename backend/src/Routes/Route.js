const express = require('express');
const router = express.Router();
const path = require("path");
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
router.post('/addCard', auth, card.addCard)
router.get('/getCards', auth , card.getCard )

// bank controller
const bank = require('../controllers/bankController')
router.post("/addBank", auth, bank.addBank)
router.get("/getBank", auth, bank.getBank)

// stripe controller
const stripe = require('../controllers/stripe')
router.post('/createStripeIntent', stripe.stripe)

router.get('/about', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'src', 'html', 'about.html'));
})
module.exports = router;