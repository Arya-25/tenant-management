
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);
