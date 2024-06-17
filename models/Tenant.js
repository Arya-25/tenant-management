const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    }
});

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    teams: [teamSchema]
});

module.exports = mongoose.model('Tenant', tenantSchema);
