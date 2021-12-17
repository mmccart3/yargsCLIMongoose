require ("./db/connection");
const yargs = require("yargs");
const {addMovie, deleteMovie, listAllMovies,updateMovie} = require("./movie/movie.functions")
const mongoose = require("mongoose");

const app = async (args) => {
    try {
        if (args.add) {
            const movieObj = {title: args.title, actor: args.actor, rating: args.rating};
            await addMovie(movieObj);
            // run add movie passing a movie object
        } else if (args.delete){
            // delete
            const movieObj = {title: args.title};
            await deleteMovie(movieObj);
            mongoose.disconnect();
        } else if (args.list){
            // list
            await listAllMovies();
            mongoose.disconnect();
        } else if (args.update){
            //update
            const movieObj = {title: args.title, actor: args.actor, rating: args.rating};
            await updateMovie(movieObj);
            mongoose.disconnect();
        }
        else
            console.log("Incorrect command");
            mongoose.disconnect()
        }
    catch (error) {
        console.log(error);
        mongoose.disconnect();
    }
};

app(yargs.argv);