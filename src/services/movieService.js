const Movie = require('../models/Movie');
const Cast = require('../models/Cast')

exports.getAll = () => Movie.find();//връща на всички филмми;
    //това ни връща заявка, която като се resolve-не ни връща МАСИВ!

    //TODO: Filter result in mongodb
exports.search = (title, genre, year) => {
    let query = {};
    //let query2 = Movie.find();
    
    if (title) {
        //result = result.filter(movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
        query.title = new RegExp(title, 'i');
        //query2 = query2.find({ title: new RegExp(title, 'i') });
    }
    if (genre) {
        //result = result.filter(movie => movie.genre.toLocaleLowerCase() === genre.toLocaleLowerCase());
        query.genre = genre.toLowerCase();
    }
    if (year) {
        query.year = year;
        //query2 = query2.find({ year })
    }
    return Movie.find(query);
    //return query2;
}

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');
//прилагаме populate на query-то още преди да сме resolve-нали promise-a;
exports.create = (movieData) => Movie.create(movieData);//връща promise, който resolve-ваме в movie controller-a;

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    //const cast = await Cast.findById(castId);
    //cast.movies.push(movie);//добавяме ръчно обратната релация;
    //await cast.save();

    //TODO: validate castId if exists
    
    //TODO: Validate if cast is already added;
    movie.casts.push(cast);

    await movie.save();

    return movie;
    // ==     =>
    //Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}