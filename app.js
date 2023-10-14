require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

//routes
const loginRoutes = require("./routes/loginRoute");
const bankRoute = require("./routes/bankDetails");
const transaction = require("./routes/transactions");
const stripe = require("./routes/stripe");

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://cashix:Gopal@123@cluster0.eg9u3nz.mongodb.net', () => {
  console.log('connected db')
});

app.use(bodyParser.json());
app.use("/crepaid_login", loginRoutes);
app.use("/crepaid_bank_details", bankRoute);
app.use("/payments", transaction);
app.use("/create-payment-intent", stripe);

//db conection 


// server start
app.listen(3000, () => {
  console.log("Running on server")
});
