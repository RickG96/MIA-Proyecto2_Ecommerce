const database = require('../services/database')

const baseQuery = 
`select 
    b.id_bitacora "id_bitacora",
    u.id_usuario "id_usuario",
    b.fecha "fecha",
    b.descripcion "descripcion",
    u.nombre "nombre"
from bitacora b, usuarios u
where b.id_usuario = u.id_usuario`

async function find(context) {
    let query = baseQuery
    const binds = {}
    const result = await database.simpleExecute(query, binds)
    return result.rows
}

module.exports.find = find

const createQuery =
`insert into bitacora (
    id_usuario,
    fecha,
    descripcion
) values (
    :id_usuario,
    TO_CHAR(SYSDATE, 'HH:MI:SS DD-MM-YYYY'),
    :descripcion
)`

async function create(emp) {
    const bitacora = Object.assign({}, emp)

    const result = database.simpleExecute(createQuery, bitacora)

    return bitacora
}

module.exports.create = create