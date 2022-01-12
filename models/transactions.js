const mongoose = require("mongoose");
const transaction = mongoose.Schema({
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: String, required: true },
  type: { type: String, required: true },
  authkey: { type: String, required: true },
  date: Date,
});
module.exports = mongoose.model("transaction", transaction);
