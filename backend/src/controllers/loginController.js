//otp Schema for database
const otpSchema = require('../databases/otpSchema')
const userSchema = require('../databases/userSchema')

const functions = require('../utils/functions')
const jwt = require('jsonwebtoken')


exports.generateOtp = async (request, response) => {
    // const mOtp = functions.generateOTP();
    // const mMobile = request.body?.mobile
    // const user = { "mobile": mMobile, mOtp }
    // const lastToken = jwt.sign(user, process.env.JSONEWEBTOKEN, { expiresIn: '60d' })
    // response.send({ status: "success", token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI5Mzk5ODQ2OTA5IiwibU90cCI6IjczMzIiLCJpYXQiOjE2OTcxNDM1MjUsImV4cCI6MTcwMjMyNzUyNX0.4ElqCYF9zU2bioFzegDNIulp6h8pu32bvm4QTO-2DTc', mobile: mMobile })

    const mOtp = functions.generateOTP();
    const mMobile = request.body?.mobile
    const SendOtpToUser = await functions.otpSender(mMobile, mOtp)
    if (SendOtpToUser?.status === 'success') {
        const user = { "mobile": mMobile, mOtp }
        const lastToken = jwt.sign(user, process.env.JSONEWEBTOKEN, { expiresIn: '60m' })
        if (otpSchema.findOneByMobile(mMobile)) {
            await otpSchema.deleteOneByMobile(mMobile)
        }
        const mOtpSchema = {
            mobile: mMobile,
            code: mOtp,
            lastToken: lastToken,
        }

        const databaseResponse = await otpSchema.insertOne(mOtpSchema);

        response.send({ status: "success", token: lastToken, mobile: mMobile })
    } else {
        response.send({ status: "failed" })
    }
}


exports.verifyOTP = async (req, res) => {
    const mMobile = req.body?.mobile
    const userCode = req.body?.otp
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token == null) res.send({ status: 401 })

    jwt.verify(token, process.env.JSONEWEBTOKEN, async (err, user) => {
        if (err) {
            console.log(`the err is ${err}`);
            res.send({ status: "something went wrong!", err });
        } else {
            const getOtp = await otpSchema.findOneByMobile(mMobile);
            if (userCode === getOtp.code) {
                const token = jwt.sign(mMobile, process.env.JSONEWEBTOKEN);
                const inUser = await userSchema.findOneByMobile(mMobile);
                if (inUser != null && inUser._id === mMobile) {
                    res.send({ token: token, status: "success", oldUser: true, mobile: mMobile });
                } else {
                    res.send({ token: token, status: "success", oldUser: false, mobile: mMobile });
                }
            } else {
                res.send({ status: "Invalid OTP!" });
            }
        }
    });
}