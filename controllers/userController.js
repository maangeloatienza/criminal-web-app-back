'use strict';

const bcrypt            = require('bcryptjs');
const mysql             = require('anytv-node-mysql');
const util              = require('./../helpers/util');
const uuidv4            = require('uuid/v4');
const jwt               = require('jsonwebtoken');
                          require('./../config/err_config');
                          require('./../config/config');


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

const user_login = {
    username : '',
    password : ''
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
    const id = req.params.id;
    function start(){

        mysql.use('master')
        .query(
            `SELECT * FROM users WHERE id = ?`,
            [req.params.id],
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

        bcrypt.hash(data.password, 10, function(err, hash) {
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


    function start(){
        if(data instanceof Error){
            return res.json({
                message : data.message,
                context : INC_DATA
            })
            .status(500);
        }
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

const login = (req,res,next)=>{
    const data = util._get
    .form_data(user_login)
    .from(req.body);
    let userData = {};
    function start(){
        if(data instanceof Error){
            return res.json({
                message : data.message,
                context : INC_DATA
            })
            .status(500);
        }

        mysql.use('master')
            .query(`SELECT * FROM users WHERE username = '${data.username}'`,
                validate_password
                )
                .end();
    }

    function validate_password(err,result,args,last_query){
        if(err){
            return res.json({
                message : BAD_REQ,
                context : err,
                query : last_query
            }).status(500);
        }

        if(!result.length){
            return res.json({
                message : 'User does not exists',
                context : ZERO_RES
            })
            .status(404);
        }

        let userData = {                    
                first_name  : result[0].first_name,
                last_name   : result[0].last_name,
                username    : result[0].username,
                email       : result[0].email,
                phone_number: result[0].phone_number
            };
        

        bcrypt.compare(data.password,result[0].password,(err,resp)=>{

            if(err){
                return res.json({
                    message : 'Login failed',
                    context : LOG_FAIL,
                    error : err
                })
            }
            
            if(!resp){
                return res.json({
                    message : 'Invalid username/password',
                    context : INV_PASS
                })
                .status(500);
            }
            if(resp){
                const token = jwt.sign({
                    first_name  : result[0].first_name,
                    last_name   : result[0].last_name,
                    username    : result[0].username,
                    email       : result[0].email,
                    phone_number: result[0].phone_number
                },JWT_TOKEN,{
                    expiresIn   : '7d'
                });
    
                return res.status(200).json({
                    message     : 'Success',
                    data        : userData,
                    token       : `Bearer ${token}`,
                    success     : true
                })
                .status(200)
                .send();
            }
            
        });
    }

    start();
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login
}