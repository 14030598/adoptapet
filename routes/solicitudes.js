const router = require('express').Router();

const {
    createSolicitud,
    getSolicitud,
    updateSolicitud,
    deleteSolicitud,
    countIdMascota
} = require('../controllers/solicitudes')
  
router.get('/', getSolicitud);
router.get('/count/:id', countIdMascota);
router.get('/:id', getSolicitud);
router.post('/', createSolicitud);
router.put('/:id', updateSolicitud);
router.delete('/:id', deleteSolicitud);

module.exports = router;