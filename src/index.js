//Основната ф-я на index.js e да създаде и стартира нашия сървър;

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');//импортваме отделените вече routes;
const configHandlebars = require('./config/configHandlebars')
const configExpress = require('./config/configExpress');

const app = express();
const port = 5000;

configHandlebars(app);
configExpress(app);

app.use(routes);//така казваме на сървъра да използва делегираните routes;
//нашият app използва модулярен router, който се грижи за route-ирането на цялото ни приложение;

mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        console.log('DB connected');
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
})
    .catch(err => console.log('Cannot connect to DB'));



