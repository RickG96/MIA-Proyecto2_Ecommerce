const chats = require('../db_apis/chats')

async function get(req, res, next) {
    try {
        const context = {}

        const rows = await chats.find(context)

        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

async function post(req, res, next) {
    try {
        let chat = {
            id_cliente: req.body.id_cliente,
            id_soporte: req.body.id_soporte
        }

        chat = await chats.create(chat)

        res.status(201).json(chat)
    } catch(err) {
        next(err)
    }
}

module.exports.post = post

async function put(req, res, next) {
    try {
        let chat = {
            punteo: req.body.punteo,
            id_chat: req.body.id_chat
        }

        chat = await chats.update(chat)

        if (chat !== null) {
            res.status(200).json(chat);
        } else {
            res.status(404).end();
        }
    } catch(err) {
        next(err)
    }
}

module.exports.put = put