'use strict';

const bcrypt            = require('bcryptjs');
const mysql             = require('anytv-node-mysql');
const util              = require('./../helpers/util');
const uuidv4            = require('uuid/v4');
                          require('./../config/err_config');


const user  = {
    first_name   : '',
    last_name    : '',
    username    : '',
    email       : '',
    password    : '',
    phone_number : '',
    _role_id      : ''
}

const opt_user = {
    _first_name   : '',
    _last_name    : '',
    _username    : '',
    _email       : '',
    _password    : '',
    _phone_number : '',
    _role_id      : ''
}



const getUsers = (req,res,next)=>{

    function start(){
        mysql.use('master')
        .query(
            `SELECT * FROM users`,
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){

        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'No results found',
                context : ZERO_RES
            }).status(404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}

const getUserById = (req,res,next)=>{

    function start(){
        const {
            id
        } = req.params.id;
        mysql.use('master')
        .query(
            `SELECT * FROM users WHERE id = ${id}`,
            send_response
        )
        .end();
    }
    function send_response(err,result,args,last_query){

        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'No results found',
                context : ZERO_RES
            }).status(404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}


const createUser = (req,res,next)=>{
    const data = util._get
    .form_data(user)
    .from(req.body);
    let password = '';
    function start(){
        if(data instanceof Error){
            return res.json({
                message : data.message,
                context : INC_DATA
            })
            .status(500);
        }
        mysql.use('master')
            .query(`SELECT * FROM users where username = '${data.username}'`,create_user)
            .end();
    }

    function create_user(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(result.length){
            return res.json({
                message : 'Username already exists',
                context : DUP_ENTRY
            })
            .status(500);
        }
        
        data.id = uuidv4();
        data.created = new Date();
        data.role_id = data.role_id? data.role_id : null;
        bcrypt.genSalt(10, function(err,salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                if(err) console.log(err);
                password = hash;
                mysql.use('master')
                .query(`INSERT INTO users(id,first_name,last_name,username,email,password,phone_number,role_id,created,updated)\
                        VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [
                        data.id,
                        data.first_name,
                        data.last_name,
                        data.username,
                        data.email,
                        password,
                        data.phone_number,
                        data.role_id,
                        data.created,
                        null
                    ],
                    send_response
                )
                .end();
            });
        });

    }

    function send_response(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.affectedRows){
            return res.json({
                message : 'Error creating user',
                context : NO_RECORD_CREATED
            })
            .status(400);
        }

        return res.json({
            data : {
                firstName : data.first_name,
                lastName : data.last_name,
                username : data.username,
                email : data.email
            },
            message : 'Success'
        })
        .status(200)
        .send();
    }

    start();
}

const updateUser = (req,res,next)=>{
    const data = util._get
    .form_data(opt_user)
    .from(req.body);
    let id = req.params.id;

    if(data instanceof Error){
        return res.json({
            message : data.message,
            context : INC_DATA
        })
        .status(500);
    }

    function start(){
        mysql.use('master')
            .query(`SELECT * FROM users WHERE id=${id}`,update_user)
            .end();
    }
    function update_user(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'User does not exist',
                context : ZERO_RES
            })
            .status(404);
        }
        data.updated = new Date();
        mysql.use('master')
            .query(`UPDATE users SET ?`,
            [data],
            send_response
            )
            .end();
    }

    function send_response(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.affectedRows){
            return res.json({
                message : 'Fail to update user information',
                context : NO_RECORD_UPDATED
            })
            .status(400);
        }

        return res.json({
            data : data,
            message : 'Success!'
        })
        .status(200)
        .send();
    }

    start();
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser
}