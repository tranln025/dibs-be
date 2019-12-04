const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// PATH = /api/v1/users

// GET All users
router.get('/', ctrl.users.showAllUsers);

//GET User by ID
router.get('/:id', ctrl.users.show);

//PUT Update user
router.put('/:id', ctrl.users.update);

module.exports = router;