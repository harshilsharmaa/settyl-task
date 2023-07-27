const express = require('express');
const router = express.Router();

const {
    allTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
} = require('../controllers/task.controller.js')

const {isAuthenticated} = require('../middleware/auth.js')

router.route('/all').get(isAuthenticated, allTasks)
router.route('/create').post(isAuthenticated, createTask);
router.route('/update/:taskId').put(isAuthenticated, updateTask);
router.route('/update/status/:taskId').patch(isAuthenticated, updateTaskStatus);
router.route('/delete/:taskId').delete(isAuthenticated, deleteTask);

module.exports = router;