const Movie = require('../models/Movie');

exports.getAll = () => Movie.find();//връща на всички филмми;
    //това ни връща заявка, която като се resolve-не ни връща МАСИВ!

    //TODO: Filter result in mongodb
exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();
    

    if (title) {
        result = result.filter(movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }
    if (genre) {
        result = result.filter(movie => movie.genre.toLocaleLowerCase() === genre.toLocaleLowerCase());
    }
    if (year) {
        result = result.filter(movie => movie.year === year);
    }
    return result;
}

exports.getOne = (movieId) => Movie.findById(movieId);

exports.create = (movieData) => Movie.create(movieData);//връща promise, който resolve-ваме в movie controller-a;