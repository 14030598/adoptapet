const router = require('express').Router();

const {
    createMascota,
    getMascotas,
    updateMascota,
    deleteMascota,
    count
} = require('../controllers/mascotas')
  
router.get('/', getMascotas);
router.get('/count/:cat', count);
router.get('/:id', getMascotas);
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

module.exports = router;