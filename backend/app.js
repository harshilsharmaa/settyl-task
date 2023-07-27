require("dotenv").config({path: "./.env"});

const path = require('path')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cors({ credentials: true, origin: ['http://localhost:3000','http://localhost:3000/'] }));
app.use(cookieParser());
app.use(express.json());

const {connectDatabase} = require('./db');
connectDatabase();


// routes
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const adminRoutes = require('./routes/admin.routes.js');


app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;