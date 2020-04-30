const express = require('express')
const router = new express.Router()
const usuarios = require('../controllers/usuarios')
const productos = require('../controllers/productos')
// servicios para usuarios, productos, etc
router.route('/usuarios/:id?')
    .get(usuarios.get)
    .delete(usuarios.borrar)
    .put(usuarios.put)

router.route('/productos/:id?')
    .get(productos.get)
    .post(productos.post)
    .put(productos.put)
    .delete(productos.borrar)

module.exports = router