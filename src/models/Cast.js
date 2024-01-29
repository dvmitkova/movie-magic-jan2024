const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 14,
    },
    born: {
        type: String,
        required: true,
    },
    nameInMovie: {
        type: String,
        required: true,
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