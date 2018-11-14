'use strict';

const express           = require('express');
const router            = express.Router();

/* ROUTES */
const userController    = require('./../controllers/userController');

router.get  ('/users', userController.getUsers);
router.get  ('/users/:id', userController.getUserById);
router.post ('/users', userController.createUser);

module.exports = router;