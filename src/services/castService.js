const Cast = require('../models/Cast');
const Movie = require('../models/Movie')

exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);
exports.getByIds = (castIds) => {
    const casts = Cast.find({_id: {$in: castIds}});
    //взимаме всички кастове, на които id-тата са измежду id-тата, които се намират в масива MovieCasts;
    return casts;
}