const express = require('express');
const router = express.Router();

const {
    profile,
    register,
    login
} = require('../controllers/user.controller.js')

router.route('/profile').get(profile);
router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;