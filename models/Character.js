// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    fullname: {    
        type: String,
        required: true,
        unique: true

    },
    role: String,
    bounty:  String,

    devilfruit:String,
    image:String,
    crew: 
    [
        { type: mongoose.Schema.Types.ObjectId,
             ref: 'Character' }
            ],
            favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Character = mongoose.model('character', CharacterSchema);
// User.createIndexes();

module.exports = Character;
// export default = mongoose.model('user', CharacterSchema);