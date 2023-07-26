require("dotenv").config({path: "./.env"});

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://3000-harshilsharm-settyltask-iq2yldz8xm5.ws-us102.gitpod.io' }));

const {connectDatabase} = require('./db');
connectDatabase();


// routes
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');


app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

module.exports = app;