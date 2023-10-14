const db = require("./db"); // Replace with the correct path to your db.js module

const usersTable = "users_table";

const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS ${usersTable} (
  _id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  mobile VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  pincode VARCHAR(255) 
)`;

const FIND_USER_BY_MOBILE = `SELECT * FROM ${usersTable} WHERE mobile = ?`;

const INSERT_USER = `INSERT INTO ${usersTable} (_id, name, mobile, email, pincode) VALUES (?, ?, ?, ?, ?)`;

const UPDATE_USER_BY_MOBILE = `UPDATE ${usersTable} SET name = ?, email = ?, pincode = ? WHERE mobile = ?`;

const DELETE_USER_BY_MOBILE = `DELETE FROM ${usersTable} WHERE mobile = ?`;

async function createTableIfNotExists() {
  try {
    await db.executeQuery(CREATE_USERS_TABLE);
    console.log("Users table created or already exists.");
  } catch (error) {
    throw error;
  }
}

async function findOneByMobile(mobile) {
  try {
    await createTableIfNotExists();
    const result = await db.executeQuery(FIND_USER_BY_MOBILE, [mobile]);
    return result[0] || null;
  } catch (error) {
    throw error;
  }
}

async function insertOne(userData) {
  try {
    await createTableIfNotExists();
    const { _id, name, mobile, email, pincode } = userData;
    const result = await db.executeQuery(INSERT_USER, [
      _id,
      name,
      mobile,
      email,
      pincode,
    ]);
    console.log("User record inserted successfully.");
    return result;
  } catch (error) {
    throw error;
  }
}
async function updateOneByMobile(mobile, userData) {
  try {
    await createTableIfNotExists();
    const { name, email, pincode } = userData;
    await db.executeQuery(UPDATE_USER_BY_MOBILE, [
      name,
      email,
      pincode,
      mobile,
    ]);
    console.log("User record updated successfully.");
  } catch (error) {
    throw error;
  }
}

async function deleteOneByMobile(mobile) {
  try {
    await createTableIfNotExists();
    await db.executeQuery(DELETE_USER_BY_MOBILE, [mobile]);
    console.log("User record deleted successfully.");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTableIfNotExists,
  findOneByMobile,
  insertOne,
  updateOneByMobile,
  deleteOneByMobile,
};
