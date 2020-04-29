const express = require('express')
const router = new express.Router()
const usuarios = require('../controllers/usuarios')
// servicios para usuarios, productos, etc
router.route('/usuarios/:id?')
    .get(usuarios.get)
    .delete(usuarios.borrar)
    .put(usuarios.put)


module.exports = router