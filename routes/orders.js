const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { userId, name, description, price, quantity, packetType, customFields } = req.body;

       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ error: 'Invalid user ID' });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        
        if (!user.orders) {
            user.orders = [];
        }

        
        if (!name || !description || !price || !quantity || !packetType) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        
        if (!['boxes', 'packets'].includes(packetType)) {
            return res.status(400).send({ error: 'Invalid packetType value' });
        }

        
        const order = new Order({ userId, name, description, price, quantity, packetType, customFields });
        await order.save();

        
        user.orders.push(order._id);
        await user.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Fetch order details by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId');
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
