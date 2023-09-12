const mongoose = require('mongoose');

const HakiSchema = new mongoose.Schema({
    

      hakiname: {
        type:String,
        unique:true,
      },        
        description: String,
        hakiuser:[
          {
            type:String,
          }
        ]     // Description of the island

      
      
});

const Haki = mongoose.model('haki', HakiSchema);

module.exports = Haki;
