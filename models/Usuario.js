
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, "No puede estar vacio el campo username"],
        lowercase: true,
        match: [/^[a-z0-9]+$/, "Username es invalido"],
        index: true
    },
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: [true, "Falta email"],
        match: [/\S+@\S+.\S+/, "Correo es invalido"],
        index: true
    },
    tipo: {
        type: String,
        enum: ['normal','anunciante']
    },
    hash: String,
    salt: String
}, {collection: "Usuarios", timestamps: true});

UsuarioSchema.plugin(uniqueValidator, {message: "Ya existe"});

UsuarioSchema.methods.publicData = function () {
    return {
        _id: this._id,
        username: this.username,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        tipo: this.tipo
    };
};

UsuarioSchema.methods.crearPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString("hex");
}

UsuarioSchema.methods.validarPassword = function (password) {
    const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === newHash;
}

UsuarioSchema.methods.generaJWT = function () {
    const today = new Date();
    const expira = new Date(today);
    expira.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        expira: parseInt(expira.getTime() / 1000)
    }, secret);
}

UsuarioSchema.methods.toAuthJSON = function (){
    return {
        username: this.username,
        email: this.email,
        token: this.generaJWT()
    }
}

mongoose.model("Usuario", UsuarioSchema);