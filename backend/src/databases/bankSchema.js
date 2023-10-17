const db = require("./db"); // Replace with the correct path to your db.js module

const bankAccountsTable = "bank_accounts_table";

const CREATE_BANK_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS ${bankAccountsTable} (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  holdername VARCHAR(255),
  bankname VARCHAR(255),
  bankifsc VARCHAR(255),
  accountnumber VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users_table(_id)
)`;

const FIND_BANK_ACCOUNTS_BY_USER_ID = `SELECT * FROM ${bankAccountsTable} WHERE user_id = ?`;

const INSERT_BANK_ACCOUNT = `INSERT INTO ${bankAccountsTable} ( holdername, bankname, bankifsc, accountnumber, user_id) VALUES ( ?, ?, ?, ?, ?)`;

const FIND_BANK_ACCOUNT_BY_ACCOUNT_NUMBER = `SELECT * FROM ${bankAccountsTable} WHERE accountnumber = ?`;

const UPDATE_BANK_ACCOUNT_BY_ACCOUNT_NUMBER = `UPDATE ${bankAccountsTable} SET holdername = ?, bankname = ?, bankifsc = ? WHERE accountnumber = ?`;

const DELETE_BANK_ACCOUNT_BY_ACCOUNT_NUMBER = `DELETE FROM ${bankAccountsTable} WHERE _id = ? AND user_id = ?`;

async function createBankAccountsTableIfNotExists() {
    try {
        await db.executeQuery(CREATE_BANK_ACCOUNTS_TABLE);
        console.log("Bank Accounts table created or already exists.");
    } catch (error) {
        throw error;
    }
}

async function findAccounts(user_id) {
    try {
        await createBankAccountsTableIfNotExists();
        const result = await db.executeQuery(FIND_BANK_ACCOUNTS_BY_USER_ID, [user_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function insertBankAccount(bankAccountData) {
    try {
        await createBankAccountsTableIfNotExists();
        const { holdername, bankname, bankifsc, accountnumber , user } = bankAccountData;
        const result = await db.executeQuery(INSERT_BANK_ACCOUNT, [
            holdername,
            bankname,
            bankifsc,
            accountnumber,
            user,
        ]);
        console.log("Bank Account record inserted successfully.");
        return result;
    } catch (error) {
        throw error;
    }
}
async function deleteAccount(accountNumber , userId) {
    try {
        await createBankAccountTableIfNotExists();
        await db.executeQuery(DELETE_BANK_ACCOUNT_BY_ACCOUNT_NUMBER, [accountNumber , userId]);
        console.log("Bank Account record deleted successfully.");
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createBankAccountsTableIfNotExists,
    findAccounts,
    insertBankAccount,
    deleteAccount
};
