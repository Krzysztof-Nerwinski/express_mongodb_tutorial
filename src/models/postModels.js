const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String
});


module.exports = mongoose.model('post', postSchema);