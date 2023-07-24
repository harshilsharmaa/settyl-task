const express = require('express');
const router = express.Router();

const {
    profile,
    register
} = require('../controllers/user.controller.js')

router.route('/profile').get(profile);
router.route('/register').post(register);

module.exports = router;