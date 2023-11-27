const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventosController')

// API EVENTOS
router.post('/', eventoController.crearEvento);
router.get('/', eventoController.obtenerEventos); // TODOS LOS EVENTOS
router.put('/:id', eventoController.actualizarEvento);
router.get('/:id', eventoController.obtenerEvento); // EVENTO INDIVIDUAL
router.delete('/:id', eventoController.eliminarEvento); // EVENTO INDIVIDUAL

module.exports = router