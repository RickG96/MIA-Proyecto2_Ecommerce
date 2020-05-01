const express = require('express')
const router = new express.Router()
const usuarios = require('../controllers/usuarios')
const productos = require('../controllers/productos')
const categorias = require('../controllers/categorias')
const catprodu = require('../controllers/catprodu')
const comentarios = require('../controllers/comentarios')
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

router.route('/categorias/:id?')
    .get(categorias.get)
    .post(categorias.post)
    .put(categorias.put)
    .delete(categorias.borrar)

router.route('/catprodu/:id?')
    .get(catprodu.get)
    .post(catprodu.post)

router.route('/comentarios/:id?')
    .get(comentarios.get) 
    .post(comentarios.post)
    .put(comentarios.put)
    .delete(comentarios.borrar)
    
module.exports = router