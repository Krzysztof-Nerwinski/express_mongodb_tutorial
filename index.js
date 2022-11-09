const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require("./src/routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/post', postRoutes)

mongoose.connect('mongodb://localhost:27017/express_tutorial');

// app.use(function (req, res, next) {
//     console.log('Time', Date.now());
//     console.log('request method', req.method);
//     next();
// }, (req, res, next) => {
//     console.log('request original url', req.originalUrl);
//     next();
// });
//
//
app.listen(PORT, () => {
    console.log(`Node and Express server is running for port ${PORT}`)
})
