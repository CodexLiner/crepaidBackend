const functions = require('../utils/functions')
const jwt = require('jsonwebtoken')
const bankSchema = require('../databases/bankSchema')

exports.addBank = async (req, res) => {
    const { holdername, bankname, bankifsc, accountnumber, user } = req.body

    const bankAccountData = {
        holdername, bankname, bankifsc, accountnumber, user
    }
    const result = await bankSchema.insertBankAccount(bankAccountData)
    console.log(result)
    res.send(result)
}

exports.getBank = async (req, res) => {
    const { user } = req.query
    console.log(user)
    if (user != null) {
        const Response = await bankSchema.findAccounts(user)
        if (Response != null) {
            res.send({ status: 'success', accounts: Response })
        } else {
            res.send({ status: 'failed' })
        }
        return
    }
}