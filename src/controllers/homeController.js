const router = require('express').Router();

const movieService = require('../services/movieService')

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();//.lean се chain-ва за query-to, за да ни върне чист обект!
    //await - връща документ;
    //без await - връща query;

//
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;
    const movies = await movieService.search(title, genre, year).lean();

    res.render('search', { movies, title, genre, year });
})

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;