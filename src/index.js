const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const routes = require('./routes');//импортваме отделените вече routes;

const app = express();
const port = 5000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('src/static'));

app.use(routes);//така казваме на сървъра да използва делегираните routes;
//нашият app използва модулярен router, който се грижи за route-ирането на цялото ни приложение;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
