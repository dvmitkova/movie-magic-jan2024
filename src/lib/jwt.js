const jwt = require('jsonwebtoken');

function sign(payload, secretPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {//създаваме промис на базата на callback;
        jwt.sign(payload, secretPrivateKey, options, (err, token) => {
            if (err) {
                return reject(err);//кара промиса, който сме създали да reject-не;
            }

            resolve(token);
        });
    });

    return promise;
}

module.exports = {
    sign,
}