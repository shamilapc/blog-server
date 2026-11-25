const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    comments: {
        type: Array,
        default: [],
    },
    date: {
       type: Date,
       default: Date.now,
    },


})

const users = mongoose.model('blog', blogSchema)

module.exports = users