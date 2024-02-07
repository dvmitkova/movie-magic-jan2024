const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';
    if (err instanceof mongoose.MongooseError) {
        message = Object.values(err.errors).at(0).message;//така взимаме конкретния първи message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return message;
}


//Middleware factory -> взима модел -> на базата на този модел създава middleware:
exports.validate = (Model) => async (req, res, next) => {
    try {
        const modelInstance = new Model(req.body);

        const isValid = await modelInstance.validate();

        if (!isValid) {
            return res.redirect('/404');
        }
        
        next();
    } catch (err) {
        const message = this.getErrorMessage(err);
        res.render('404', { error: message });
    }
}