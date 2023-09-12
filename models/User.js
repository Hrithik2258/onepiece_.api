// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {         //01
        type: String,
        required: true,

    },
    email: {                    //02
        type: String,
        required: true,
        unique: true,
    },
    password: {                         //03
        type: String
    }
   
   

  
});

const User = mongoose.model('user', UserSchema);

module.exports = User;