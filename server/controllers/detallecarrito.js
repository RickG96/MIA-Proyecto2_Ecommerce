const detalles = require('../db_apis/detallecarrito')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await detalles.find(context)

        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let detalle = {
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto
        }

        detalle = await detalles.create(detalle)

        res.status(201).json(detalle)
    } catch(err) {
        nex(err)
    }
}

module.exports.post = post

async function borrar(req, res, next) {
    try {
        let detalle = {}

        detalle.id_detalle = parseInt(req.params.id, 10)

        detalle = await detalles.borra(detalle)

        if (detalle !== null) {
            res.status(200).json(detalle);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.borrar = borrar

async function put(req, res, next) {
    try {
        let detalle = {}

        detalle.id_detalle = parseInt(req.params.id, 10)

        detalle = await detalles.update(detalle)

        if (detalle !== null) {
            res.status(200).json(detalle);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.put = put