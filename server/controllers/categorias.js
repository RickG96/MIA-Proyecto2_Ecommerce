const categorias = require('../db_apis/categorias.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.id = parseInt(req.params.id, 10)

        const rows = await categorias.find(context)

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
        let categoria = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            id_padre: req.body.id_padre
        }

        categoria = await categorias.create(categoria)

        res.status(201).json(categoria)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post

async function put(req, res, next) {
    try {
        let categoria = {
            descripcion: req.body.descripcion,
            id_categoria: req.body.id_categoria
        }

        categoria = await categorias.update(categoria)

        if (categoria !== null) {
            res.status(200).json(categoria);
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
        let categoria = {}
        categoria.id_categoria = parseInt(req.params.id, 10)

        categoria = await categorias.borra(categoria)

        if (categoria !== null) {
            res.status(200).json(categoria);
        } else {
            res.status(404).end();
        }
    }  catch(err) {
        next(err)
    }
}

module.exports.borrar = borrar