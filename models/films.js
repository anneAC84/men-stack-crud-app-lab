const mongoose = require('mongoose')
// Compile the schema into a model:
const filmsSchema = new mongoose.Schema({
    nameOfFilm: String,
    leadActor: String,
})

const Films = mongoose.model('Films', filmsSchema);

// Export the model:
module.exports = Films;
