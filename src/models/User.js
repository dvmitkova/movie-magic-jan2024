const { Schema, model, MongooseError } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);//хешираме паролата;

    this.password = hash;//презаписваме съществуващата парола;
});

userSchema.virtual('rePassword')//закачаме виртуално пропърти в модела, бяз да се записва в DB.
    .set(function(value) {
        //validate
        if (value !== this.password) {
            throw new MongooseError('Password mismatch!')
        }
    });

const User = model('User', userSchema);

module.exports = User;