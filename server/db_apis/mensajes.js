const database = require('../services/database')

const baseQuery = 
`SELECT 
    id_mensaje "id_mensaje",
    id_chat "id_chat",
    mensaje "mensaje",
    fecha "fecha"
FROM detalle_chat
ORDER BY id_mensaje`

async function find(context) {
    let query = baseQuery
    const binds ={}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql = 
`INSERT INTO detalle_chat(
    id_chat,
    mensaje, 
    fecha
) VALUES (
    :id_chat,
    :mensaje,
    TO_CHAR(SYSDATE, 'HH:MI:SS DD-MM-YYYY')
)`

async function create(emp) {
    const mensaje = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, mensaje)

    return mensaje
}

module.exports.create = create