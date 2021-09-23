/* 
Mascota.js
// Clase que representa la mascota a adoptar 
class Mascota {
    constructor(id, nombre, categoria, fotos, descripcion, anunciante, ubicacion) {
        this.id = id;
        this.nombre = nombre; // nombre de la mascota (o titulo del anuncio)
        this.categoria = categoria; // perro | gato | otro
        this.fotos = fotos; // links a las fotografías
        this.descripcion = descripcion; // descripción del anuncio
        this.anunciante = anunciante; // contacto con la persona que anuncia al animalito
        this.ubicacion = ubicacion; // muy importante
    }
}

module.exports = Mascota;
*/

const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    categoria: {type: String, enum: ['Perro', 'Gato', 'Pez']},
    fotos: String,
    descripcion: {type: String, require: true},
    anunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    ubicacion: String
}, {collection: "Mascotas", timestamps: true});

MascotaSchema.methods.publicData = () => {
    return {
        nombre: this.nombre,
        categoria: this.categoria,
        fotos: this.fotos,
        descripcion: this.descripcion,
        anunciante: this.anunciante,
        ubicacion: this.ubicacion
    };
};

mongoose.model('Mascota', MascotaSchema);