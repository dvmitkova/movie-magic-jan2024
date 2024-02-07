const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = (userData) => {
    const user = User.findOne({email: userData.email});
    //ако вече има регистриран потребител със същия имейл, хвърляме грешка;
    if (user) {
        throw new Error('Email already exists');
    }

    return User.create(userData);
}

exports.login = async (email, password) => {
    //Get user from DB
    const user = await User.findOne({ email });

    //Check if user exists
    if (!user) {
        throw new Error('Cannot find email or password');//за да не издаваме информация
        //дали даден юзър съществува, като това знание може да бъде потенциална заплаха.
    }

    //Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);//паролата, която се подава + хешираната парола:
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }
    //Generate jwt - работи с callback - трябва да конвертираме ф-ята в promise-функция
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

    //Return token if validation passed
    return token;
}