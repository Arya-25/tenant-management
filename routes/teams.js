const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Tenant = require('../models/Tenant');

// Add a team to a tenant
router.post('/:tenantId/teams', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        const team = new Team({
            name: req.body.name,
            tenantId: tenant._id
        });
        await team.save();
        res.status(201).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Fetch all teams of a tenant
router.get('/:tenantId/teams', async (req, res) => {
    try {
        const teams = await Team.find({ tenantId: req.params.tenantId });
        res.status(200).send(teams);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Fetch team details by teamId
router.get('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const team = await Team.findOne({ teamId: req.params.teamId, tenantId: req.params.tenantId });
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Fetch all tenants of a specific team by teamId
router.get('/teams/:teamId', async (req, res) => {
    try {
        const team = await Team.findOne({ teamId: req.params.teamId });
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        const tenants = await Tenant.find({ _id: team.tenantId });
        res.status(200).send(tenants);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a team by teamId
router.put('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const team = await Team.findOneAndUpdate(
            { teamId: req.params.teamId, tenantId: req.params.tenantId },
            { name: req.body.name },
            { new: true, runValidators: true }
        );
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        res.status(200).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a team by teamId
router.delete('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({ teamId: req.params.teamId, tenantId: req.params.tenantId });
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
