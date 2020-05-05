const bitacoras = require('../db_apis/bitacora')

async function get(req, res, next) {
    try {
        const context = {}

        context.id = parseInt(req.params.id, 10)

        const rows = await bitacoras.find(context)

        if(req.params.id) {
            if(rows.length === 1) {
                res.status(200).json(rows[0])
            } else {
                res.status(404).end()
            }
        } else {
            res.status(200).json(rows)
        }
    }  catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let bitacora = {
            id_usuario: req.body.id_usuario,
            descripcion: req.body.descripcion
        }

        bitacora = bitacoras.create(bitacora)

        res.status(201).json(bitacora)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post