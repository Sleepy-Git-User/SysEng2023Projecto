// JS Imports
const path = require('path');
const interface = require("./DataBase/interface");
const database = interface.Database;
// Express Imports
const express = require('express');
const app = express();
app.use(express.static(path.resolve(__dirname, "../client/dist"), { index: false }));

// Server Middleware
app.use((req, res, next) => {
    const start = +new Date();
    next();
    const time = +new Date() - start;
    console.log('Request made to', req.path, 'took', `${time}ms`);
})

// Server Config
const port = process.env.PORT || 3000;

// Routers
const APIRoute = require('./routes/api')({express});

// Routes
app.use('/api', APIRoute);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Client/dist', 'index.html'));
})

// Open listener
app.listen(port , () => {
    console.log(`POS Server Listening on port ${port}`);
})