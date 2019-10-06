let mongoose = require('mongoose');

// create a model class
let playerSchema = mongoose.Schema({
    name: String,
    points: Number

},
{
    collection: "player"
});

module.exports = mongoose.model('player', playerSchema);
