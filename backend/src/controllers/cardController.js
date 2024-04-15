const cardSchema = require("../databases/cardSchema");

// Create a new card account
exports.addCard = async (req, res) => {
    try {
        const { cardholdername, cardnumber, cardExpMonth , cardcvv , cardExpYear, user } = req.body;
        const cardData = {
            cardholdername,
            cardnumber,
            cardExpMonth,
            cardExpYear,
            cardcvv,
            user,
        };

        const result = await cardSchema.insertCardAccount(cardData);
        if (result != null) {
            const response = await cardSchema.findCardAccounts(user);
            if (response != null) {
                res.status(200).json({ status: 'success', card: response });
            } else {
                res.status(404).json({ status: 'not found', message: 'Card account not found' });
            }
        } else {
            res.status(500).json({ status: 'failed', message: 'Failed to create a card account' });
        }
    } catch (error) {
        console.error(error);
        res.status(203).json({ status: 'error', message: 'An error occurred' });
    }
};

// Get card account by card number
exports.getCard = async (req, res) => {
    try {
        const { user } = req.query;
        if (user) {
            const response = await cardSchema.findCardAccounts(user);
            if (response != null) {
                console.log(JSON.stringify(response))
                res.status(200).json({ status: 'success', card: response });
            } else {
                res.status(404).json({ status: 'not found', message: 'Card account not found' });
            }
        } else {
            res.status(400).json({ status: 'bad request', message: 'Missing "cardnumber" query parameter' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
};
