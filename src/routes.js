const router = require('express').Router();//използваме вградената ф-я Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');


router.use(movieController);
router.use(homeController);

router.get('*', (req, res) => {//взимаме всичко, което не е намерено от controllers и го пращаме към page /404;
    res.redirect('/404');
})

module.exports = router;