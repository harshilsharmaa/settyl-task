require("dotenv").config({path: "./.env"});

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const {connectDatabase} = require('./db');
connectDatabase();


// routes
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');


app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

module.exports = app;