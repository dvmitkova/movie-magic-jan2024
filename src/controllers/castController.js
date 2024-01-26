const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', (req, res) => {//когато правим post заявка на страницата:
    const body = req.body;//взимаме данните

    console.log(body);//логваме ги

    res.redirect('/');//връщаме на нач. страница;
})

module.exports = router;