const mongoose = require('mongoose');

const DevilFruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Paramecia', 'Zoan', 'Logia'],
    required: true,
  },
  description: String,
  image:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character', 
  },
});

const DevilFruit = mongoose.model('devilfruit', DevilFruitSchema);

module.exports = DevilFruit;
