const router = require('express').Router();//използваме вградената ф-я Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');

router.use(homeController);
router.use(movieController);


module.exports = router;