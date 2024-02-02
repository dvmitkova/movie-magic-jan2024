const router = require('express').Router();

const authService = require('../services/authService')

router.get('/register', (req, res) => {//взимаме данните:
    res.render('auth/register');
});

router.post('/register', async (req, res) => {//актуално регистриране:
    const userData = req.body;

    await authService.register(userData);

    res.redirect('/auth/login'); 
});

router.get('/login', (req, res) => {//взимаме данните:
    res.render('auth/login');
});

router.post('/login', async (req, res) => {//актуалното логване:
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);//създавам куки и закрепвам ст-стта на token към него.

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;