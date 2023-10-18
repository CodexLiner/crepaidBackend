const db = require("./db"); // Replace with the correct path to your db.js module

const cardAccountsTable = "card_accounts_table";

const CREATE_CARD_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS ${cardAccountsTable} (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  cardholdername VARCHAR(255),
  cardnumber VARCHAR(255) NOT NULL,
  expirationdate VARCHAR(255),
  user_id VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users_table(_id)
)`;

const FIND_CARD_ACCOUNTS_BY_USER_ID = `SELECT * FROM ${cardAccountsTable} WHERE user_id = ?`;

const INSERT_CARD_ACCOUNT = `INSERT INTO ${cardAccountsTable} (cardholdername, cardnumber, expirationdate, user_id) VALUES (?, ?, ?, ?)`;

const FIND_CARD_ACCOUNT_BY_CARD_NUMBER = `SELECT * FROM ${cardAccountsTable} WHERE cardnumber = ?`;

const UPDATE_CARD_ACCOUNT_BY_CARD_NUMBER = `UPDATE ${cardAccountsTable} SET cardholdername = ?, expirationdate = ? WHERE cardnumber = ?`;

const DELETE_CARD_ACCOUNT_BY_CARD_NUMBER = `DELETE FROM ${cardAccountsTable} WHERE _id = ? AND user_id = ?`;

async function createCardAccountsTableIfNotExists() {
    try {
        await db.executeQuery(CREATE_CARD_ACCOUNTS_TABLE);
        console.log("Card Accounts table created or already exists.");
    } catch (error) {
        throw error;
    }
}

async function findCardAccounts(user_id) {
    try {
        await createCardAccountsTableIfNotExists();
        const result = await db.executeQuery(FIND_CARD_ACCOUNTS_BY_USER_ID, [user_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function insertCardAccount(cardAccountData) {
    try {
        await createCardAccountsTableIfNotExists();
        const { cardholdername, cardnumber, expirationdate, user } = cardAccountData;
        const result = await db.executeQuery(INSERT_CARD_ACCOUNT, [
            cardholdername,
            cardnumber,
            expirationdate,
            user,
        ]);
        console.log("Card Account record inserted successfully.");
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteCardAccount(cardNumber, userId) {
    try {
        await createCardAccountsTableIfNotExists();
        await db.executeQuery(DELETE_CARD_ACCOUNT_BY_CARD_NUMBER, [cardNumber, userId]);
        console.log("Card Account record deleted successfully.");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCardAccountsTableIfNotExists,
    findCardAccounts,
    insertCardAccount,
    deleteCardAccount
};
