let mongoose = require('mongoose');
// create a model class
let boutSchema = mongoose.Schema({
    number: Number,
    full: String,
    tourneyId: String
},
{
    collection: "bout"
});

module.exports = mongoose.model('bout', boutSchema);
