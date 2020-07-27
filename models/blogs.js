const mongoose = require('mongoose')
const Schema = mongoose.Schema

//This is my Schema for the Blogs collection. Defines the structure of our model

const blogSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    snippet: {
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
}, { timestamps:true })

const Blog = mongoose.model('Blog', blogSchema) //the first parameter, has to be the singular of our collection name.

module.exports = Blog