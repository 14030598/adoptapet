const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");
const passport = require('passport');

// CRUD
function createUsuario(req, res, next) {
    const body = req.body, password = body.password;
    delete body.password;
    const usuario = new Usuario(body);
    usuario.crearPassword(password);
    usuario.save()
    .then(user => {
        return res.status(200).send(user.toAuthJSON)
    })
    .catch(next);
}

function getUsuarios(req, res, next) {
    Usuario.findById(req.usuario.id)
    .then(user => {
        if(!user)
            return res.sendStatus(401);
        return res.json(user.publicData());
    })
    .catch(next);
}

function updateUsuario(req, res, next) {
    Usuario.findById(req.usuario.id)
    .then(user => {
        if (!user) { return res.sendStatus(401); }
        let nuevaInfo = req.body
        if (typeof nuevaInfo.username !== 'undefined')
          user.username = nuevaInfo.username
        if (typeof nuevaInfo.bio !== 'undefined')
          user.bio = nuevaInfo.bio
        if (typeof nuevaInfo.foto !== 'undefined')
          user.foto = nuevaInfo.foto
        if (typeof nuevaInfo.ubicacion !== 'undefined')
          user.ubicacion = nuevaInfo.ubicacion
        if (typeof nuevaInfo.telefono !== 'undefined')
          user.telefono = nuevaInfo.telefono
        if (typeof nuevaInfo.password !== 'undefined')
          user.crearPassword(nuevaInfo.password)
        user.save()
        .then(updatedUser => {                                   //Guardando usuario modificado en MongoDB.
          res.status(201).json(updatedUser.publicData())
        })
        .catch(next);
    })
    .catch(next);
}

function deleteUsuario(req, res, next) {
    Usuario.findOneAndDelete({_id: req.usuario.id})
    .then(user => {
       res.status(200).send('Usuario eliminado');
    })
    .catch(next);
}

function iniciarSesion(req, res, next) {
    if(!req.body.email || !req.body.password){ 
        return res.status(422).json({ error : { email : 'falta información'}});
    }
    passport.authenticate('local',
    {session: false},
    function (err, user, info) {
        if(err){return next(err)}
        if(user){
            user.token = user.generaJWT();
        }else{
            return res.status(422).json(info);
        }
    })(req, res, next);
}

// exportamos las funciones definidas
module.exports = {
    createUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    iniciarSesion
}