'use strict';

const mysql             = require('anytv-node-mysql');
const uuidv4            = require('uuid/v4');
const util              = require('./../helpers/util');
const err_response      = require('./../libraries/response').err_response;

const role = {
    id: uuidv4(),
    name : '',
}


/**
 * @api {post} v1/roles                     Create Roles 
 * @apiName Create Role
 * @apiGroup Roles
 * 
 * 
 * @apiParam {String}       name            Name of the role
 */



const createRole = (req,res,next)=>{
    let data = util._get
    .form_data(role)
    .from(req.body);

    function start(){
      
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }

        mysql.use('master')
            .query('SELECT * FROM roles where name = ?',
            data.name,
            create_role
            )
            .end();
    }

    function create_role(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(result.length){
            return err_response(res,EXISTING,DUP_ENTRY,400);
        }
        data.created = new Date();
        data.updated = null;
        data.deleted = null;
        mysql.use('master')
            .query(`INSERT INTO roles SET ?`,
            data,
            send_response)
            .end();

    }

    function send_response(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }
        if(!result.affectedRows){
            return err_response(res,ERR_CREATING,NO_RECORD_CREATED,402)
        }

        return res.json({
            message : 'Success',
        })
        .status(200)
        .send();
    }

    start();
}



module.exports = {
    createRole
}