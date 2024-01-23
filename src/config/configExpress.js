const express = require('express');
const path = require('path');

function configExpress(app) {
app.use(express.static(path.resolve('src/static')));//CWD = Current Working Directory
//.resolve се базира на CWD;
app.use(express.urlencoded({ extended: false }));
//middleware, който чете и парсва информацията в body-to преди данните да дойдат при нас.
//Използва се за извличане на данни от форма.
return app;
}

module.exports = configExpress;