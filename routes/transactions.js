const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const trans = require("../models/transactions");
const token_aa = 'ffc52dcb17afedeb96226be0719b3b40b2f68ea4b605e7206e396c4044b8dd71'

router.post("/", auth, async (req, res) => {
  console.log("ayayayaya");
  const newTrans = new trans({
    transactionId: req.body.transactionId,
    status: req.body.status,
    amount: req.body.amount,
    authkey: req.body.authkey,
    type: req.body.type,
  });
  try {
    const addTrans = await newTrans.save();
    res.json(addTrans);
  } catch (e) {
    console.log(e);
  }
});
router.get("/list", auth, async (req, res) => {
  console.log(req.mobile);
  // res.sendS(200);
  try {
    const transactionList = await trans.find({ authkey: req.mobile });
    res.json(transactionList);
  } catch (e) {
    console.log(e);
  }
});
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
// exports
module.exports = router;
