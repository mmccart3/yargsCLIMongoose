const Movie = require("./movie.model");
const mongoose = require("mongoose");

exports.addMovie = async (movieObj) => {
    try {
        const newMovie = new Movie(movieObj);
        await newMovie.save();
        mongoose.disconnect();
    } catch (error) {
        console.log(error)
        mongoose.disconnect();
    }
  };

  exports.deleteMovie = async (movieObj) => {
    try {
        const returnValue = await Movie.deleteOne({title: movieObj.title});
        if (returnValue.deletedCount == 1) {
            console.log(`Successfully deleted ${movieObj.title} `);
        } else {
            console.log(`${movieObj.title} not found in db`)
        }
        mongoose.disconnect();
    } catch (error) {
        console.log(error)
        mongoose.disconnect();
    }
  };

  
exports.listAllMovies =  async () => {
    try{
        const returnValue = await Movie.find({},{});
        let items = [];
        await returnValue.forEach(function(doc){
          items.push(doc);
        });
        console.log('This is the list of your favourite films');
        for (let index = 0; index < items.length; index++) {
            console.log(`Title= ${items[index].title}  Actor= ${items[index].actor} Rating= ${items[index].rating}`);
            };
            mongoose.disconnect();
    } catch(error) {
        console.log(error);
        mongoose.disconnect();
        }
};


exports.updateMovie =  async (movieObj) => {
    try{
        if (!movieObj.rating) {
            const myTemp2 = await Movie.updateOne({title: movieObj.title }, {$set: {actor: movieObj.actor}} );
            if (myTemp2.modifiedCount == 0) {
                console.log("Film title not found in document");
            } else {
                console.log(`Successfully updated ${movieObj.title}  with actor ${movieObj.actor}`)                
            }
        } else if (!movieObj.actor){
            const myTemp2 = await Movie.updateOne({title: movieObj.title }, {$set: {rating: parseInt(movieObj.rating)}} );
            if (myTemp2.modifiedCount == 0) {
                console.log("Film title not found in document");
            } else {
                console.log(`Successfully updated ${movieObj.title}  with rating ${movieObj.rating}`)                
            }
        } else {
            const myTemp2 = await Movie.updateOne({title: movieObj.title }, {$set: {actor: movieObj.actor, rating: parseInt(movieObj.rating)}});
            if (myTemp2.modifiedCount == 0) {
                console.log("Film title not found in document");
            } else {
                console.log(`Successfully updated ${movieObj.title}  with actor ${movieObj.actor} and rating ${movieObj.rating}`)                
            }
        }
    } catch(error) {
        console.log(error)
    }
}