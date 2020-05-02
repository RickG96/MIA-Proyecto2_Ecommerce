const carritos = require('../db_apis/carrito')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await carritos.find(context)

        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let carrito = {
            id_usuario: req.body.id_usuario
        }

        carrito = await carritos.create(carrito)

        res.status(201).json(carrito)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post

async function put(req, res, next) {
    try {
        let carrito = {
            total: req.body.total,
            id_carrito: req.body.id_carrito
        }

        carrito = await carritos.update(carrito)

        if (carrito !== null) {
            res.status(200).json(carrito);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.put = put