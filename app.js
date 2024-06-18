const express = require('express');
const mongoose = require('mongoose');
const tenantRoutes = require('./routes/tenants');
const teamRoutes = require('./routes/teams');
const userRoutes = require('./routes/users');  
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tenants', tenantRoutes);
app.use('/tenants', teamRoutes);
app.use('/users', userRoutes); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
