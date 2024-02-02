const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

//router.use(isAuth);//ако го ползваме за целия файл, това значи, че всички
//страници, които се опитваме да достъпим първо ще преминат през isAuth
//и ако имаме автентикация, ще ги заредим.

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id,
    }

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    //const casts = await castService.getByIds(movie.casts).lean();
    const isOwner = movie.owner == req.user?._id;

    movie.rating = new Array(Number(movie.rating)).fill(true);//rating
    //TODO This is not perfect, use handlebars helpers
    //movie.ratingStars = '&#x2605;'.repeat(movie.rating)

    res.render('movie/details', { movie, isOwner });
});

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();
    //TODO remove already added cast
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    
    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);    
});
//Когато достъпим пътя => минаваме през мидълуеър isAuth и ако юзъра е 
//аутентикиран => преминаваме на next => async.....
router.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { movie });
})

module.exports = router;