const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cashix",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Function to execute a MySQL query
function executeQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    executeQuery,
};