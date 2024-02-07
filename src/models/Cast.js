const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        match:/^[a-zA-Z0-9 ]+$/
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 1,
    },
    born: {
        type: String,
        required: true,
        minLength: 10,
        match:/^[a-zA-Z0-9 ]+$/
    },
    nameInMovie: {
        type: String,
        required: true,
        minLength: 5,
        match:/^[a-zA-Z0-9 ]+$/
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator(value) { 
                return /^https?:\/\//.test(value) //функция за валидиране - object-method syntax;
            },
            message: (props) => `${props.value} is invalid url for the castImage!`
        }
    },
    // movies: [{//двойна релация - когато влезнем в актьор, да видим неговите филми;
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Movie,'//актьорите имат релация към филмите;
    // }]
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;