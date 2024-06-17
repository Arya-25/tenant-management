const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { v4: uuidv4 } = require('uuid');

// Add a team to a tenant
router.post('/:tenantId/teams', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        const team = {
            teamId: uuidv4(),
            name: req.body.name
        };
        tenant.teams.push(team);
        await tenant.save();
        res.status(201).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Fetch all teams of a tenant
router.get('/:tenantId/teams', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        res.status(200).send(tenant.teams);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Fetch team details by teamId
router.get('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        const team = tenant.teams.find(t => t.teamId === req.params.teamId);
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
        const teamId = req.params.teamId;
        const tenants = await Tenant.find({ 'teams.teamId': teamId });
        if (tenants.length === 0) {
            return res.status(404).send({ error: 'No tenants found for the specified team' });
        }
        res.status(200).send(tenants);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a team by teamId
router.put('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        const team = tenant.teams.find(t => t.teamId === req.params.teamId);
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        team.name = req.body.name || team.name;
        await tenant.save();
        res.status(200).send(team);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a team by teamId
router.delete('/:tenantId/teams/:teamId', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.tenantId);
        if (!tenant) {
            return res.status(404).send({ error: 'Tenant not found' });
        }
        const team = tenant.teams.find(t => t.teamId === req.params.teamId);
        if (!team) {
            return res.status(404).send({ error: 'Team not found' });
        }
        tenant.teams = tenant.teams.filter(t => t.teamId !== req.params.teamId);
        await tenant.save();
        res.status(200).send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
