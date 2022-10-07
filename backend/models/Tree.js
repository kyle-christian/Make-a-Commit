const mongoose = require('mongoose')

const Schema = mongoose.Schema

const treeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    treeAge: {
        type: Number,
        required: true
    },
    treeDate: {
        type: String,
        required: true
    }   
}, { timestamps: true }) 

module.exports = mongoose.model('Tree', treeSchema)