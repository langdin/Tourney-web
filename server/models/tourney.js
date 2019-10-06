let mongoose = require('mongoose');
// create a model class
let tourneySchema = mongoose.Schema({
  name: String,
  description: String,
  numberOfPlayers: Number,
  ownerId: String
},
{
    collection: "tourney"
});

module.exports = mongoose.model('tourney', tourneySchema);
