const { use } = require('../Routes/Route')
const userSchema = require('../databases/userSchema')
exports.addUser = async (req, res) => {
    const { name, email, pincode, mobile } = req.body

    const user = {
        _id: mobile, name, email, pincode, mobile
    }
    console.log("mobile is " + JSON.stringify(req.body))
    const result = await userSchema.insertOne(user)
    if (result != null) {
        const Response = await userSchema.findOneByMobile(mobile)
        res.send({ status: 'success', user: Response })
        return
    }
    res.send({ status: "failed" })

}
exports.getUser = async (req, res) => {
    const { user } = req.query
    console.log(user)
    if (user != null) {
        const Response = await userSchema.findOneByMobile(user)
        if (Response != null) {
            res.send({ status: 'success', user: Response })
        } else {
            res.send({ status: 'failed' })
        }
        return
    }
}