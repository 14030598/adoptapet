//Importando passport, middleware para autenticación.
const passport = require('passport');
//Estrategia a utilizar para autentificacion
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

console.log('estoy en passport');
//Configurando elementos utilizados para habilitar sesión.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, next) => {
    Usuario.findOne({ email: email})
    .then(function(user){
        if (!user || !user.validarPassword(password)) {
            return next(null, false, {error : {'El correo o contraseña': 'es incorrecta'}});
        }
        return next(null, user);
    })
    .catch(next)
}));



// passport.use('local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, function (email, password, done) {
//     Usuario.findOne({ email: email }).then(function (user) {
//       if (!user || !user.validarPassword(password)) {
//         return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
//       }
//       return done(null, user);
//     }).catch(done);
//   }));

// si queremos por usuario tendria que hacerse otro .use y cambniar email por username