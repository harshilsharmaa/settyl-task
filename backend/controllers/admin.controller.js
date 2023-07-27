const User = require('../models/User');
const Task = require('../models/Task');

exports.taskAnalytics = async(req,res)=>{
    try {

        const tasks =  Task.find({}).populate('created_by_user','assigned_user');

        const users = User.find({});

        const tasksInfo =  Task.aggregate([
            {
                $group:{
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                    count: { $sum: 1 }
                }
            }
        ]);

        Promise.all([tasks, users, tasksInfo]).then((values)=>{
            const tasks = values[0];
            const users = values[1];
            const tasksInfo = values[2];

            const output = tasksInfo.map((task)=>{
                return {label:task._id.toString(), count:task.count};
            })

            const tasksStatusCount = tasks.reduce((acc, task)=>{
                if(task.status === 'done'){
                    acc.completed += 1;
                }
                else if(task.status === 'pending'){
                    acc.pending += 1;
                }
                else{
                    acc.inprogress += 1;
                }
                return acc;
            }, {
                done:0,
                pending:0,
                inprogress:0
            })

            const output2 = [
                {label:'done', value:tasksStatusCount.done},
                {label:'pending', value:tasksStatusCount.pending},
                {label:'inprogress', value:tasksStatusCount.inprogress}
            ]

            res.status(200).json({tasks, users, tasksInfo:output, tasksStatusCount:output2});
        })
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
} 

exports.tasksByDate = async(req,res)=>{
    try {
        const tasks = await Task.aggregate([
            {
                $group:{
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                    count: { $sum: 1 }
                }
            }
        ]);

        const output = tasks.map((task)=>{
            return {date:task._id, count:task.count};
        })

        res.status(200).json({output});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find().populate('created_by_user','assigned_user');
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.updateUserRole = async(req,res)=>{
    try {
        const {userRole} = req.body;
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        user.userRole = userRole;
        await user.save();
        const users = await User.find({});
        res.status(200).json({message:'User role updated successfully',users});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}