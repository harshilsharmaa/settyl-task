const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    due_date:{
        type: Date
    },
    status:{
        type: String,
        enum: ['pending', 'progress', 'done']
    },
    created_by_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assigned_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date
    }
})

module.exports = mongoose.model('Task', taskSchema);