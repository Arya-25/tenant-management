const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    config: [{
        key: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        },
        default: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true,
            enum: [0, 1]
        }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
