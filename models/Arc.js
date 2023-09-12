// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArcSchema = new Schema({
    arc_title:{
        type:String,
        required
        :true,
        unique:true
    },
    start_episode:{
        type:Number,
        required:true
    },
    end_episode:{
        type:String
    },
    description:{
        type:String
    },
    total_episode:{
        type:Number
    }
 
});

const Arc= mongoose.model('arc', ArcSchema);
// User.createIndexes();

module.exports = Arc;
