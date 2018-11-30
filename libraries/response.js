'use strict';
require('./../config/err_config');



exports.err_response = (res,message,context,status)=>{
    res.status(status).json({
        message : message,
        context : context
    });
}