const usuarios = require('../db_apis/usuarios.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.id = parseInt(req.params.id, 10)

        const rows = await usuarios.find(context)

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

async function borrar(req, res, next) {
    try {
        let usuario = {};
        usuario.id_usuario = parseInt(req.params.id, 10)

        usuario = await usuarios.borra(usuario)

        if (usuario !== null) {
            res.status(200).json(usuario);
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
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenia: req.body.contrasenia,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            credito: req.body.credito,
            id_usuario: parseInt(req.params.id, 10)
        }
        usuario = await usuarios.update(usuario)
        if (usuario !== null) {
            res.status(200).json(usuario);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.put = put

async function post(req, res, next) {
    try {
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasenia: req.body.contrasenia,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            fotografia: 'http://localhost:3000/uploads/' + req.body.fotografia, 
            genero: req.body.genero,
            fecha_nacimiento: req.body.fecha_nacimiento,
            tipo_usuario: req.body.tipo_usuario,
            credito: req.body.credito,
            membresia: req.body.membresia
        }

        usuario = await usuarios.create(usuario)

        res.status(201).json(usuario)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post