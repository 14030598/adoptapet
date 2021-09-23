const jwt = require('express-jwt');
//Accedemos a secret de esa forma por la exportacion del archivo en config
const secret = require('../config').secret;


function getTokenFromHeader(req) {
    if (req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'Token' || req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];        
    }
    return null;
}

const auth = {
    // Privado
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader
    }),
    // Publico
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;