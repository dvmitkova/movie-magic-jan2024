const router = require('express').Router();//използваме вградената ф-я Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');

router.use(homeController);
router.use(movieController);
router.use('/cast', castController);

router.get('*', (req, res) => {//взимаме всичко, което не е намерено от controllers и го пращаме към page /404;
    res.redirect('/404');
})

module.exports = router;