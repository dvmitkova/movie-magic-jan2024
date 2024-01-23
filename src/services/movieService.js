const movies = [{
    _id: 1,
    title: 'Batman',
    genre: 'Action',
    director: 'No man',
    date: '2010',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_FMjpg_UX1000_.jpg',
    rating: '8.9',
    description: 'Based on the comics'
}];

exports.getAll = () => {
    return movies.slice();//shallow cloning на масива, за да не се дава на user-a референция
    //към нашия масив, който в последствие да може да промени.
    // == return [...movies] = нов масив със spread-нат вътре стария;
    // == return Array.from(movies); ??
}

exports.getOne = (movieId) => {
    const movie = movies.find(movie => movie._id == movieId);

    return movie;
}

exports.create = (movieData) => {
    movieData._id = movies[movies.length - 1]._id + 1;
    movies.push(movieData);
}