// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DialSchema = new Schema({
    dialname:String,
    dialtype:String,
    dialdescription:String,
    image:String
 
});

const Dial= mongoose.model('dial', DialSchema);

module.exports = Dial;
