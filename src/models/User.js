const { Schema, model, MongooseError } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,//не може да има втори потребител с такъв имейл;
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid email address'],
        minLength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password should be at least 6 characters'],
        required: true,
    },
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);//хешираме паролата;

    this.password = hash;//презаписваме съществуващата парола;
});

userSchema.virtual('rePassword')//закачаме виртуално пропърти в модела, бяз да се записва в DB.
    .set(function(value) {//value идва от полето, в което въвеждаме repass;
        //validate
        if (value !== this.password) {
            throw new MongooseError('Password mismatch!')
        }
    });

const User = model('User', userSchema);

module.exports = User;