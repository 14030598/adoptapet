const mongoose = require('mongoose');
const Mascota = mongoose.model("Mascota");

// CRUD
function createMascota(req, res, next) {
    const mascota = new Mascota(req.body);
    mascota.save().then(pet => {
        res.status(200).send(pet);
    }).catch(next);
}

function getMascotas(req, res, next) {
    if(req.params.id){// paso un id y solo regresa la mascota de ese id
        Mascota.findById(req.params.id)
        .then(pet => {res.send(pet)})
        .catch(next);
    }else{
        Mascota.find()
        .then(pets => res.send(pets))
        .catch(next);
    }
}

function updateMascota(req, res, next) {
    Mascota.findById(req.params.id)
    .then(pet => {
        if(!pet){ return res.sendStatus(401);}
        let nuevamascota = req.body;
        if(typeof nuevamascota.nombre !== 'undefined')
            mascota.nombre = nuevamascota.nombre;
        if(typeof nuevamascota.categoria !== 'undefined')
            mascota.categoria = nuevamascota.categoria;
        if(typeof nuevamascota.fotos !== 'undefined')
            mascota.fotos = nuevamascota.fotos;
        if(typeof nuevamascota.descripcion !== 'undefined')
            mascota.descripcion = nuevamascota.descripcion;
        if(typeof nuevamascota.anuciante !== 'undefined')
            mascota.anuciante = nuevamascota.anuciante;
        if(typeof nuevamascota.ubicacion !== 'undefined')
            mascota.ubicacion = nuevamascota.ubicacion;
        pet.save()
        .then(petupdated => res.status(200).json(petupdated.publicData))
        .catch(next);
    })
    .catch(next);

    // var mascota = new Mascota(req.params.id, 'Pelusa', 'Gato', 'fotos', 'Tambien blanca', 'anunciante', 'alla');
    // const modificaciones = req.body;
    // mascota = {...mascota, ...modificaciones};
    // res.send(mascota);
}

function deleteMascota(req, res, next) {
    Mascota.findOneAndDelete({_id: req.params.id})
    .then(eliminandoando => {
        res.status(200).send(`Mascota ${req.params.id} ha sido eliminado: ${eliminandoando}`);
    }).catch(next); //Quiuboles que? y tu mascota se escapó
}

function count(req, res, next) {
    let categoria = req.params.cat;
    Mascota.aggregate([
        {'$match': { 'categoria': categoria}}, 
        {'$count': 'total'}
    ])
    .then(total => res.status(200).send(total))
    .catch(next);
}

// exportamos las funciones definidas
module.exports = {
    createMascota,
    getMascotas,
    updateMascota,
    deleteMascota,
    count
}