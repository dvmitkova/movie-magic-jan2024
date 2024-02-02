//Служи за това да валидира токъните на всички логнати потребители:
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    //get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();//щом нямаме логнат потребител, продължаваме напред;
    }

    try {
        //validate token
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;//ако е логнат = true;

        next();
    } catch {
        res.clearCookie('auth');

        res.redirect('/auth/login');
    }
}
//middleware, който проверява дали юзъра е оторизиран:
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login')
    }
    next();
}