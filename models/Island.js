const mongoose = require('mongoose');

const IslandSchema = new mongoose.Schema({
    

      name: {
        type:String,
        unique:true,
      },        
        location: String,    // Geographical location of the island
        description: String,     // Description of the island
        climate: String,       // Climate of the island (e.g., tropical, snowy) 
        arc_apperacence:String,// List of story arcs where the island appears
        image:String       // URL to an image representing the island
      
      
});

const Island = mongoose.model('island', IslandSchema);

module.exports = Island;
