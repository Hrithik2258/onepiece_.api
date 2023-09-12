const mongoose = require("mongoose");

const LuffyAttackSchema = new mongoose.Schema({
  attackname: {
    type: String,
    unique: true,
  },
  attackpower: String,
  description: String, // Description of the attack
  image: String, // URL to an image representing the atcak
});

const LuffyAttack = mongoose.model("luffyattack", LuffyAttackSchema);

module.exports = LuffyAttack;
