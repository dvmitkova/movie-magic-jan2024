const router = require('express').Router();//използваме вградената ф-я Router();

const homeController = require('./controllers/homeController');

router.use(homeController);

module.exports = router;