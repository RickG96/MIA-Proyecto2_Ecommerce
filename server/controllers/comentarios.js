const comentarios = require('../db_apis/comentarios')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await comentarios.find(context)

        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
} 

module.exports.get = get

async function post(req, res, next) {
    try {
        let comentario = {
            id_usuario: req.body.id_usuario,
            id_producto: req.body.id_producto,
            descripcion: req.body.descripcion,
            punteo: req.body.punteo,
            titulo: req.body.titulo
        }

        comentario = await comentarios.create(comentario) 

        res.status(201).json(comentario)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post

async function put(req,res, next) {
    try {
        let comentario = {
            respuesta: req.body.respuesta,
            id_comentario: req.body.id_comentario
        }

        comentario = await comentarios.update(comentario)

        if (comentario !== null) {
            res.status(200).json(comentario);
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
        let comentario = {}

        comentario.id_comentario = parseInt(req.params.id, 10)
        
        comentario = await comentarios.borra(comentario)

        if (comentario !== null) {
            res.status(200).json(comentario);
        } else {
            res.status(404).end();
        }
    }  catch(err) {
        next(err)
    }
}

module.exports.borrar = borrar