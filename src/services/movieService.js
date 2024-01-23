const movies = [{
    title: 'Batman',
    genre: 'Action',
    director: 'No man',
    date: '2010',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_FMjpg_UX1000_.jpg',
    rating: '8.9',
    description: 'Based on the comics'
}];

exports.create = (movieData) => {
    console.log(movieData);
    movies.push(movieData);
}