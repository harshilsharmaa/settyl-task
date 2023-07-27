const express = require('express');
const router = express.Router();

const {
    profile,
    register,
    login,
    allUsers,
    logout
} = require('../controllers/user.controller.js')

const {isAuthenticated} = require('../middleware/auth.js')

router.route('/profile').get(isAuthenticated, profile);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/all').get(allUsers);

router.route('/logout').get(isAuthenticated,logout);

module.exports = router;