const express = require('express');
const router = express.Router();

const {
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller.js')

const {isAuthenticated} = require('../middleware/auth.js')

router.route('/create').post(isAuthenticated, createTask);
router.route('/update/:taskId').put(isAuthenticated, updateTask);
router.route('/delete/:taskId').delete(isAuthenticated, deleteTask);

module.exports = router;