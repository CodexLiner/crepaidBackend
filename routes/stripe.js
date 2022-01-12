const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = express.Router();
//stripe sdk
const stripe = require("stripe")(
  "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"
);
const app = express();
app.use(express.static("public"));
app.use(express.json());
//calculate price
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  var ammount = 0;
  console.log();
  return 10;
};

router.post("/", async (req, res) => {
  console.log("hello");
  // const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    // metadata: {
    //   order_id: req.body.id,
    // },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
