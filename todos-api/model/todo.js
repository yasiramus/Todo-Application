const mongoose = require('mongoose');

//requiring the schema instance class
//the schema helps us to define the structure of the model
const { Schema } = mongoose;
const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
    
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};