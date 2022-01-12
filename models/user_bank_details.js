const mongoose = require("mongoose");
// creating Schema
const bankSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: { type: String, default: "NaN" },
  mobile: { type: String, required: false },
  authkey: { type: String, required: true },
  UserAccount: { type: String, required: true },
  UserKycIdType: { type: String, default: "NaN" },

  UserKycId: { type: String, default: "NaN" },

  UserIfsc: { type: String, required: true },
});
// exports
module.exports = mongoose.model("Bankdetails", bankSchema);
