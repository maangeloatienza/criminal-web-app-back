'use strict';
const mysql  =  require('anytv-node-mysql');
const err_response      = require('./../libraries/response').err_response;
const jwt    =  require('jsonwebtoken');
                require('./../config/err_config');
                require('./../config/config');

module.exports = (req, res, next) => {
    try {
        
    const token = req.headers.authorization.split(" ")[1];

    function start(){
        mysql.use('master')
        .query(
            `
                SELECT token from tokens where token = ?
            `,
            token,
            validate_token
        )
        .end();
    }

    function validate_token(err,result,args,last_query){
        if(err){
            return false;
        }

        if(!result.length){
            return err_response(res,NO_TOKEN,BAD_REQ,500);
        }
        const decoded = jwt.verify(token, JWT_TOKEN);

        req.user = decoded;
        req.user.token = token;
        next();
    
    }
    

    start();

    } catch (error) {
        return res.status(401).json({
            message : NO_TOKEN
        });
    }
};


