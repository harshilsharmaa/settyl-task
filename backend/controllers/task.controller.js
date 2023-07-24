const Task = require('../models/Task.js');
const User = require('../models/User.js')

exports.createTask = async (req, res) => {
    try {

        const { title, description, due_date, assigned_user_id } = req.body;

        if (!title || !description || !due_date || !assigned_user_id) {
            return res.status(400).json({
                success: false,
                message: "all fields are erquired"
            })
        }

        const assigned_user = await User.findById(assigned_user_id);
        if (!assigned_user) {
            return res.status(400).json({
                success: false,
                error: "assigned user not found"
            })
        }

        const newTask = await Task.create({
            title,
            description,
            due_date: new Date(due_date),
            created_by_user: req.user._id,
            assigned_user: assigned_user_id,
            created_at: Date.now()
        })

        // adding to assigned_user's task array
        await assigned_user.tasks.push(newTask._id);
        await assigned_user.save();


        // adding to created_by user's task array
        const created_by_user = await User.findById(req.user._id);
        created_by_user.tasks.push(newTask);
        await created_by_user.save();

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            task: newTask
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const { title, description, due_date, assigned_user_id } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (due_date) task.due_date = new Date(due_date);
        if (assigned_user_id && assigned_user_id != task.assigned_user_id) {
            const user = await User.findById(assigned_user_id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: "Assigned user not found",
                });
            }
            task.assigned_user = assigned_user_id;
            user.tasks.push(taskId);
            await user.save();
        }

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Remove the task from the user's tasks array
        const user = await User.findById(task.assigned_user);
        if (user) {
            user.tasks = user.tasks.filter((taskId) => taskId.toString() !== task._id.toString());
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
};