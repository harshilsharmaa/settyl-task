const express = require('express');
const router = express.Router();

const {
    tasksByDate,
    getAllTasks,
    taskAnalytics,
    updateUserRole
} = require('../controllers/admin.controller.js')

const {isAuthenticated, isAdmin} = require('../middleware/auth.js')

router.route('/taskAnalytics').get(isAuthenticated, isAdmin, taskAnalytics)
router.route('/tasksbydate').get(isAuthenticated, isAdmin, tasksByDate)
router.route('/getalltasks').get(isAuthenticated,isAdmin, getAllTasks)
router.route('/updateuserrole/:userId').patch(isAuthenticated, isAdmin, updateUserRole)

module.exports = router;