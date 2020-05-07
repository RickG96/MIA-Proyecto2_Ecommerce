const database = require('../services/database')

const baseQuery =
`SELECT 
    c.id_chat "id_chat",
    c.id_cliente "id_cliente",
    c.id_soporte "id_soporte",
    u1.nombre "cliente",
    u2.nombre "soporte",
    c.estado "estado",
    c.punteo "punteo"
FROM 
    chat c, usuarios u1, usuarios u2
WHERE 
    c.id_cliente = u1.id_usuario
AND 
    c.id_soporte = u2.id_usuario
ORDER BY 
    c.id_chat`

async function find(context) {
    let query = baseQuery
    const binds ={}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql =
`INSERT INTO chat (
    id_cliente,
    id_soporte,
    estado,
    punteo
) VALUES (
    :id_cliente,
    :id_soporte,
    1,
    null
)`

async function create(emp) {
    const chat = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, chat)

    return chat
}

module.exports.create = create

const updateSql =
`UPDATE chat
SET estado = 0,
    punteo = :punteo
WHERE id_chat = :id_chat`

async function update(emp) {
    const chat = Object.assign({}, emp) 

    const result = await database.simpleExecute(updateSql, emp)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return chat
    } else {
        return null
    }
}

module.exports.update = update
