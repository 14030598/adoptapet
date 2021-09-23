const router = require('express').Router();
const {
    createUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    iniciarSesion
} = require('../controllers/usuarios')
const auth = require('./auth');

router.get('/', auth.requerido, getUsuarios);
router.get('/:id', auth.requerido, getUsuarios);
router.post('/', createUsuario);
router.post('/entrar', iniciarSesion);
router.put('/:id', auth.requerido, updateUsuario);
router.delete('/:id', auth.requerido, deleteUsuario);

module.exports = router;