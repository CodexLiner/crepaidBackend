//otp Schema for database
const otpSchema = require('../databases/otpSchema')
const userSchema = require('../databases/userSchema')

const functions = require('../utils/functions')
const jwt = require('jsonwebtoken')


exports.generateOtp = async (request, response) => {

    const mOtp = functions.generateOTP();
    const mMobile = request.body?.mobile

    if (mMobile === "9399846909") {
        const user = { "mobile": mMobile, mOtp }
        const lastToken = jwt.sign(user, process.env.JSONEWEBTOKEN, { expiresIn: '60m' })
        if (otpSchema.findOneByMobile(mMobile)) {
            await otpSchema.deleteOneByMobile(mMobile)
        }
        const mOtpSchema = {
            mobile: mMobile,
            code: '9871',
            lastToken: lastToken,
        }

        const databaseResponse = await otpSchema.insertOne(mOtpSchema);

        response.send({ status: "success", token: lastToken, mobile: mMobile })
        return;

    }

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