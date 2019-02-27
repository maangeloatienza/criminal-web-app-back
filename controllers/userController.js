'use strict';

const bcrypt            = require('bcryptjs');
const mysql             = require('anytv-node-mysql');
const util              = require('./../helpers/util');
const uuidv4            = require('uuid/v4');
const jwt               = require('jsonwebtoken');
const err_response      = require('./../libraries/response').err_response;
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


/**
 * @api {get} v1/users                      Request User information
 * @apiName Get Users
 * @apiGroup Users
 *
 * 
 * @apiSuccess {String}     first_name      First name of the user
 * @apiSuccess {String}     last_name       Last name of the user
 * @apiSuccess {String}     username        Username of the user
 * @apiSuccess {String}     email           Email address of the user
 * @apiSuccess {String}     phone_number    Phone number of the user
 * @apiSuccess {String}     role_id         Role id of the user
 */



const getUsers = (req,res,next)=>{
    const {
        username,
        first_name,
        last_name
    } = req.query;
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
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        return res.json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}
/**
 * @api {get} v1/users/:id                  Request User information
 * @apiName Get User By Id
 * @apiGroup Users
 * 
 * @apiParam   {String}     id              Id of the user
 * 
 * @apiSuccess {String}     first_name      First name of the user
 * @apiSuccess {String}     last_name       Last name of the user
 * @apiSuccess {String}     username        Username of the user
 * @apiSuccess {String}     email           Email address of the user
 * @apiSuccess {String}     phone_number    Phone number of the user
 * @apiSuccess {String}     role_id         Role id of the user
 */

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
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }

        return res.status(200).json({
            message : 'Success!',
            data : result
        })
        .send();
    }

    start();
}

/**
 * @api {post} v1/users                     Create User 
 * @apiName Create User
 * @apiGroup Users
 * 
 * 
 * @apiParam {String}       first_name      First name of the user
 * @apiParam {String}       last_name       Last name of the user
 * @apiParam {String}       username        Username of the user
 * @apiParam {String}       password        Password of the user
 * @apiParam {String}       confirm_password Confirm user's Password 
 * @apiParam {String}       email           Email address of the user
 * @apiParam {String}       phone_number    Phone number of the user
 * @apiParam {String}       role_id         Role id of the user
 */


const createUser = (req,res,next)=>{
    const data = util._get
    .form_data(user)
    .from(req.body);
    let password = '';
    function start(){
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }
        mysql.use('master')
            .query(`SELECT * FROM users where username = '${data.username}'`,create_user)
            .end();
    }

    function create_user(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
        }
        
        data.id = uuidv4();
        data.created = new Date();
        data.updated = null;
        data.role_id = data.role_id? data.role_id : null;

        bcrypt.hash(data.password, 10, function(err, hash) {
            if(err) err_response(res,err,BAD_REQ,500);
            data.password = hash;
            mysql.use('master')
            .query(`INSERT INTO users SET ?`,
                data,
                send_response
            )
            .end();
        });


    }

    function send_response(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.affectedRows){
            return err_response(res,ERR_CREATING,NO_RECORD_CREATED,402)
        }

        return res.status(200).json({
            data : {
                firstName : data.first_name,
                lastName : data.last_name,
                username : data.username,
                email : data.email
            },
            message : 'Success'
        })
        .send();
    }

    start();
}

/**
 * @api {put}  v1/users/:id                 Update User information 
 * @apiName  Update User
 * @apiGroup Users
 * 
 * @apiParam {String}       [first_name]    First name of the user
 * @apiParam {String}       [last_name]     Last name of the user
 * @apiParam {String}       [username]      Username of the user
 * @apiParam {String}       [password]      Password of the user
 * @apiParam {String}       [email]         Email address of the user
 * @apiParam {String}       [phone_number]  Phone number of the user
 * @apiParam {String}       [role_id]       Role id of the user
 */

const updateUser = (req,res,next)=>{
    const data = util._get
    .form_data(opt_user)
    .from(req.body);
    let id = req.params.id;


    function start(){
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }
        mysql.use('master')
            .query(`SELECT * FROM users WHERE id=${id}`,update_user)
            .end();
    }
    function update_user(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
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
            return err_response(res,BAD_REQ,err,500);
        }
        if(!result.affectedRows){
            return err_response(res,ERR_UPDATING,NO_RECORD_UPDATED,402)
        }

        return res.status(200).json({
            data : data,
            message : 'Success!'
        })
        .send();
    }

    start();
}
/**
 * @api {post} v1/users/login               Login User information
 * @apiName  Login User
 * @apiGroup Users
 * 
 * @apiParam {String}       [username]      Username of the user
 * @apiParam {String}       [password]      Password of the user
 */

const login = (req,res,next)=>{

    const data = util._get
    .form_data(user_login)
    .from(req.body);
    let userData = {};
    function start(){
        if(data instanceof Error){
            return err_response(res,data.message,INC_DATA,500);
        }
        mysql.use('master')
            .query(`SELECT user.*,role.* FROM users user
                    LEFT JOIN roles role
                    ON role.id = user.role_id
                    WHERE user.username = ?`,
                data.username,
                validate_password
                )
                .end();
    }

    function validate_password(err,result,args,last_query){
        if(err){
            return err_response(res,BAD_REQ,err,500);
        }

        if(!result.length){
            return err_response(res,ZERO_RES,ZERO_RES,404);
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
                return err_response(res,LOG_FAIL,err,500);
            }
    
            if(!resp){
                return err_response(res,`${INV_USER}/${INV_PASS}`,LOG_FAIL,404);
            }
            if(resp){
                const token = jwt.sign({
                    first_name  : result[0].first_name,
                    last_name   : result[0].last_name,
                    username    : result[0].username,
                    email       : result[0].email,
                    phone_number: result[0].phone_number
                },JWT_TOKEN);

                if(saveToken(res,token)===false){
                    return err_response(res,NO_TOKEN_CREATED,err,500);
                }
    
                return res.status(200).json({
                    message     : 'Success',
                    data        : userData,
                    token       : `Bearer ${token}`,
                    success     : true
                })
                .send();
            }
            
        });
    }

    start();
}


/**
 * @api {put}  v1/users/logout                 Logout User 
 * @apiName  Logout User
 * @apiGroup Users
*/

const logout = (req,res,next)=>{
    let token = req.user.token;

    function start(){
        mysql.use('master')
        .query(
            `
                SELECT * FROM tokens WHERE token = ?
            `,
            token,
            validate_token
        )
        .end();
    }

    function validate_token(err,result,args,last_query){
        if(err){
            return err_response(res,err,BAD_REQ,500);
        }

        if(!result.length){
            return err_response(res,NO_ACTIVE_TOKEN,NO_TOKEN,404);
        }

        mysql.use('master')
        .query(`
            DELETE FROM tokens WHERE token = ?
        `,
        token,
        send_response
        )
        .end();
    }

    function send_response(err,result,args,last_query){
        if(err){
            return err_response(res,err,BAD_REQ,500);
        }

        if(!result.affectedRows){
            return err_response(res,NO_TOKEN_DELETED,ZERO_RES,404);
        }
        return res.json({
            message : 'Sucessfully logged out'
        })
        .send();
        
    }
    start();
}


function saveToken(res,token){
    let data = {};

    data.id = uuidv4();
    data.token = token;
    data.created = new Date();
    function start(){
        mysql.use('master')
            .query(
                `
                    INSERT INTO tokens SET ?
                `,
                data,
                validate_token
            )
            .end();
    }

    function validate_token(err,result,args,last_query){
        if(err){
            return false
        }

        if(!result.affectedRows){
            return false
        }

        return true;
    }

    start();
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login,
    logout
}