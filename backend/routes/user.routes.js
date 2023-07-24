const express = require('express');
const router = express.Router();

const {
    profile,
    register,
    login,
    allUsers
} = require('../controllers/user.controller.js')

const {isAuthenticated} = require('../middleware/auth.js')

router.route('/profile').get(isAuthenticated, profile);
router.route('/register').post(register);
router.route('/login').post(login);

router.route('/all').get(allUsers);

module.exports = router;