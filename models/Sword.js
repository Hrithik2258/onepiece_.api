const mongoose = require('mongoose');

const SwordSchema = new mongoose.Schema({
    

      swordname: {
        type:String,
        unique:true,
      },
      swordowner:String,        
        swordpower:String,   // Geographical location of the island
        description: String,     // Description of the island
        image:String       // URL to an image representing the island
      
      
});

const Sword = mongoose.model('sword', SwordSchema);

module.exports = Sword;
