const mongoose = require("mongoose");

const MascotaSchema = new mongoose.Schema({
  nombre: {type: String, required: true}, // nombre de la mascota (o titulo del anuncio)
  categoria: { type: String, enum: ['perro', 'gato', 'otro'] }, // perro | gato | otro
  fotos: [String], // links a las fotografías
  descripcion: {type:String, required: true}, // descripción del anuncio
  anunciante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}, // contacto con la persona que anuncia al animalito
  ubicacion: { type: String }, // muy importante
  estado:{type: String, enum:['adoptado', 'disponible', 'pendiente']},
}, { timestamps: true , collection : 'Mascotas'})

MascotaSchema.methods.publicData = function(){
  return {
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion,
    estado: this.estado
  };
};

mongoose.model('Mascota', MascotaSchema)

