const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    // mongo = déjà uuid donc normal si je mets pas la propriété :)

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
}, { timestamps: true});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;