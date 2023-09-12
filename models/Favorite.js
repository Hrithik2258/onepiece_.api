const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
});

const Favorite = mongoose.model("favorite", FavoriteSchema);

module.exports = Favorite;
