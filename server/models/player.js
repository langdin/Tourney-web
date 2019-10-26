let mongoose = require('mongoose');

// create a model class
let playerSchema = mongoose.Schema({
    name: String,
    points: [{
      score: Number
      }],
    boutId: String
},
{
    collection: "player"
});

module.exports = mongoose.model('player', playerSchema);
