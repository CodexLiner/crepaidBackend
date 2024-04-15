const express = require("express");
const router = express.Router();
const bankSchema = require("../databases/bankSchema");

// Create a new bank account
exports.addBank = async (req, res) => {
  try {
    const { holdername, bankname, bankifsc, accountnumber, user } = req.body;
    const bankAccountData = {
      holdername: Buffer.from(holdername).toString("base64"),
      bankname: Buffer.from(bankname).toString("base64"),
      bankifsc: Buffer.from(bankifsc).toString("base64"),
      accountnumber: Buffer.from(accountnumber).toString("base64"),
      user,
    };
    const result = await bankSchema.insertBankAccount(bankAccountData);
    if (result != null) {
      res.status(200).json({ status: "success", accounts: bankAccountData });
    } else {
      res
        .status(500)
        .json({ status: "failed", message: "Failed to insert bank account" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
};

// Get bank accounts for a user
exports.getBank = async (req, res) => {
  try {
    const { user } = req.query;
    if (user) {
      const response = await bankSchema.findAccounts(user);
      if (response != null) {
        const decodedResponse = response.map((account) => ({
          holdername: Buffer.from(account.holdername, "base64").toString(),
          bankname: Buffer.from(account.bankname, "base64").toString(),
          bankifsc: Buffer.from(account.bankifsc, "base64").toString(),
          accountnumber: Buffer.from(
            account.accountnumber,
            "base64"
          ).toString(),
          user: account.user,
        }));
        res.status(200).json({ status: "success", accounts: decodedResponse });
      } else {
        res.status(404).json({
          status: "not found",
          message: "No bank accounts found for the user",
        });
      }
    } else {
      res.status(400).json({
        status: "bad request",
        message: "Missing 'user' query parameter",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
};
