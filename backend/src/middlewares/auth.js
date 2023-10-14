const jwt = require('jsonwebtoken');
const { use } = require('../Routes/Route');

function auth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const userCode = req.method === "POST" ? req.body.code : req.query.code;

    if (token == null) res.sendStatus(401);

    jwt.verify(token, process.env.JSONEWEBTOKEN, async (err, user) => {
        if (err) {
            res.send({ status: "failed" });
        }
        if (req.method === "POST") {
            req.body.user = user;
        } else if (req.method === "GET") {
            req.query.user = user;
        }
        req.user = user;
        next();
    });
}

module.exports = auth;
