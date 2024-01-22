const express = require('express');
const path = require('path');

function configExpress(app) {
app.use(express.static(path.resolve('src/static')));//CWD = Current Working Directory
//.resolve се базира на CWD;

return app;
}

module.exports = configExpress;