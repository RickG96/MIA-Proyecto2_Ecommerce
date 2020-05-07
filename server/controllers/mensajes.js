const mensajes = require('../db_apis/mensajes')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await mensajes.find(context)

        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let mensaje = {
            id_chat: req.body.id_chat,
            mensaje: req.body.mensaje
        }

        mensaje = await mensajes.create(mensaje)

        res.status(201).json(mensaje)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post