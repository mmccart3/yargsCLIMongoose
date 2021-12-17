const mongoose = require("mongoose");

const movieSchema =  new  mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
            },
    actor: {
        type: String,
        default: "Unknown",
    },
    rating: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
    }

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie