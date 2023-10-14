const db = require("./db");

const otps = "otp_table";

async function createTableIfNotExists() {
    const query = `CREATE TABLE IF NOT EXISTS ${otps} (
        mobile VARCHAR(255) PRIMARY KEY,
        code VARCHAR(255) NOT NULL,
        lastToken VARCHAR(255) NOT NULL
    )`;
    try {
        await db.executeQuery(query);
    } catch (error) {
        throw error;
    }
}

async function findOneByMobile(mobile) {
    await createTableIfNotExists();
    const query = `SELECT * FROM ${otps} WHERE mobile = ?`;
    const result = await db.executeQuery(query, [mobile]);
    return result[0] || null;
}

async function insertOne(otpData) {
    const { mobile, code, lastToken } = otpData;
    await createTableIfNotExists(); // Ensure the table exists
    const query = `INSERT INTO ${otps} (mobile, code, lastToken) VALUES (?, ?, ?)`;
    try {
        await db.executeQuery(query, [mobile, code, lastToken]);
        console.log("OTP record inserted successfully.");
    } catch (error) {
        throw error;
    }
}

async function deleteOneByMobile(mobile) {
    await createTableIfNotExists();
    const query = `DELETE FROM ${otps} WHERE mobile = ?`;
    try {
        await db.executeQuery(query, [mobile]);
        console.log("OTP record deleted successfully.");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findOneByMobile,
    insertOne,
    deleteOneByMobile,
};
