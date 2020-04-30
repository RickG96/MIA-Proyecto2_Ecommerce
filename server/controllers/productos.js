const productos = require('../db_apis/productos.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.id = parseInt(req.params.id, 10)

        const rows = await productos.find(context)

        if(req.params.id) {
            if(rows.length === 1) {
                res.status(200).json(rows[0])
            } else {
                res.status(404).end()
            }
        } else {
            res.status(200).json(rows)
        }
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: 'http://localhost:3000/uploads/' + req.body.imagen,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            color: req.body.color,
            id_usuario: req.body.id_usuario
        }
        console.log(producto)
        producto = await productos.create(producto)

        res.status(201).json(producto)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post

async function put(req, res, next) {
    try {
        let producto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            color: req.body.color,
            id_producto: req.body.id_producto
        }

        producto = await productos.update(producto)

        if (producto !== null) {
            res.status(200).json(producto);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.put = put

async function borrar(req, res, next) {
    try {
        let producto = {}
        producto.id_producto = parseInt(req.params.id, 10)

        producto = await productos.borra(producto)

        if (producto !== null) {
            res.status(200).json(producto);
        } else {
            res.status(404).end();
        } 
    } catch(err) {
        next(err)
    }
}

module.exports.borrar = borrar