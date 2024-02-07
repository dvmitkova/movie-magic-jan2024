const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        match:/^[a-zA-Z0-9 ]+$/
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        match:/^[a-zA-Z0-9 ]+$/
    }, 
    director: {
        type: String,
        required: true,
        minLength: 5,
        match:/^[a-zA-Z0-9 ]+$/
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        match:/^[a-zA-Z0-9 ]+$/
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\// //RegExp
    },
    casts: [{//държим референция към Cast;
        type: mongoose.Types.ObjectId,//обект, който се съхранява в DB и съдържа уникално Id;
        ref: 'Cast',//релация - референция към модела, към който ObjectId сочи.
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;