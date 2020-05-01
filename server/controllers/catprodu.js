const catprodu = require('../db_apis/catprodu')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await catprodu.find(context)

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
        let catpro = {
            id_categoria: req.body.id_categoria,
            id_producto: req.body.id_producto
        }

        catpro = await catprodu.create(catpro)

        res.status(201).json(catpro)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post