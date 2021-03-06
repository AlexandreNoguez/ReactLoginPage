const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: 'Access denied'});
    }
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({error: 'Access denied'});

    }
    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Access denied, validation not allowed'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Access denied'});

        req.userId = decoded.id;
        return next();
    })
}
