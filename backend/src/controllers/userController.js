const { use } = require('../Routes/Route')
const userSchema = require('../databases/userSchema')
exports.addUser = async (req, res) => {
    const { name, email, pincode, user } = req.body

    const userData = {
        _id: user, name, email, pincode, mobile: user
    }
    const result = await userSchema.insertOne(userData)
    if (result != null) {
        const Response = await userSchema.findOneByMobile(user)
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