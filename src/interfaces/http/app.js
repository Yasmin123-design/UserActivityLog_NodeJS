const express = require('express');
const bodyParser = require('body-parser');
const userActivityRoutes = require('./routes/userActivityRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', userActivityRoutes);

module.exports = app;
