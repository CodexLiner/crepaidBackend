const stripe = require("stripe")(
    "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"
);
exports.stripe = async (req, res) => {
    console.log("hello");
    const { amount, transactionid } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        payment_method_types: ['card'],
    });

    res.send({
        status: "success",
        clientSecret: paymentIntent.client_secret,
    });
}