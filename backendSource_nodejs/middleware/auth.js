const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-tok');
    if (!token)
        return res.status(401).send("Token mavjud emas!");

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send("Noto'g'ri token!");
    }
}