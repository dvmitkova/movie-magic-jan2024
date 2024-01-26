const router = require('express').Router();

const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {//когато правим post заявка на страницата:
    const castData = req.body;//взимаме данните

    await castService.create(castData);

    res.redirect('/');//връщаме на нач. страница;
})

module.exports = router;