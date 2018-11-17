'use strict';

const jwt = require('jsonwebtoken');
            require('./../config/err_config');
            require('./../config/config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            code: NO_TOKEN
        });
    }
};
