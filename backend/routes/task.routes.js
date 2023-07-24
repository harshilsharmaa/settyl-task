const express = require('express');
const router = express.Router();

const {
    createTask
} = require('../controllers/task.controller.js')

const {isAuthenticated} = require('../middleware/auth.js')

router.route('/create').post(isAuthenticated, createTask);

module.exports = router;