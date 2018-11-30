'use strict';

const express           = require('express');
const router            = express.Router();
const checkAuthorization= require('./../middleware/checkauth');
const passport          = require('passport');
                          require('./../middleware/passport')(passport);
/* ROUTES */
const userController    = require('./../controllers/userController');
const roleController    = require('./../controllers/roleController');

router.get  ('/users',              userController.getUsers);
router.get  ('/users/:id',          userController.getUserById);
router.post ('/users',              userController.createUser);
router.put  ('/users/:id',          userController.updateUser);
router.post ('/users/login',        userController.login);
router.get  ('/users/logout',       userController.logout);

router.post ('/roles',              roleController.createRole);

module.exports = router;