require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const config = require('../config')
const routesV1 = require('./routes/v1');

// Initialize the application
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send({ message: `Welcome to ${config.APP_NAME} server!` }))
app.use('/api/v1/', routesV1)

app.use((req, res, next) =>
res.status(404).send({
    status: 'fail',
    error: '404_NOT_FOUND_ERROR',
    message: 'You have entered a black hole, find your way out!'
}));

app.use((err, req, res, next) =>{
    
}

)