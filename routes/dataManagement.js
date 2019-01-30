'use strict';

const express           = require('express');
const router            = express.Router();
const checkAuthorization= require('./../middleware/checkauth');
const passport          = require('passport');
                          require('./../middleware/passport')(passport);
/* ROUTES */
const userController    = require('./../controllers/userController');
const roleController    = require('./../controllers/roleController');

router.get  ('/users',              checkAuthorization, userController.getUsers);
router.get  ('/users/:id',                              userController.getUserById);
router.post ('/users',                                  userController.createUser);
router.put  ('/users/:id',          checkAuthorization, userController.updateUser);
router.post ('/users/login',                            userController.login);
router.post ('/users/logout',       checkAuthorization, userController.logout);

router.post ('/roles',              checkAuthorization, roleController.createRole);
router.get  ('/roles',                                  roleController.getRole);


module.exports = router;