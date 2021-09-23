const mongoose = require('mongoose');
const Solicitud = mongoose.model("Solicitud");

// CRUD
function createSolicitud(req, res, next){
	var solicitud = new Solicitud(req.body);
    solicitud.save()
		.then(soli => {
        	res.status(200).send(soli);
    	})
		.catch(next)
}

function getSolicitud(req, res, next){
	if (req.params.id) {
        Solicitud.findById(req.params.id)
		.then(solicitud => {
            res.send(solicitud)
        })
		.catch(next)
    } else {
        Solicitud.find()
		.then(solicitud => {
            res.send(solicitud)
        })
		.catch(next)
    }
}

function updateSolicitud(req, res, next){
	Solicitud.findById(req.params.id)
	.then(solicitud => {
		if (!solicitud) { return res.sendStatus(401); }
		let nuevaInfo = req.body
		if (typeof nuevaInfo.idMascota !== 'undefined')
			solicitud.idMascota = nuevaInfo.idMascota
		if (typeof nuevaInfo.idUsuarioAnunciante !== 'undefined')
			solicitud.idUsuarioAnunciante = nuevaInfo.idUsuarioAnunciante
		if (typeof nuevaInfo.idUsuarioSolicitante !== 'undefined')
			solicitud.idUsuarioSolicitante = nuevaInfo.idUsuarioSolicitante
		if (typeof nuevaInfo.estado !== 'undefined')
			solicitud.estado = nuevaInfo.estado
		
			solicitud.save()
		.then(updated => {
			res.status(200).json(updated.publicData())
		})
		.catch(next)
	})
	.catch(next)
	
}

function deleteSolicitud(req, res, next) {
    Solicitud.findOneAndDelete({_id: req.params.id})
    .then(eliminandoando => {
        res.status(200).send(`Solicitud ${req.params.id} ha sido eliminado: ${eliminandoando}`);
    }).catch(next);
}

function countIdMascota(req, res, next){
	const idMascota = req.params.id;
	Solicitud.aggregate([
		{"$match": {"idMascota": idMascota}},
		{"$count": "total"}
	]).then(r => {
		res.status(200).send(r);
	})
	.catch(next);
}

module.exports = {
	createSolicitud,
	getSolicitud,
	updateSolicitud,
	deleteSolicitud,
	countIdMascota
}