const database = require('../services/database')

const baseQuery = 
   `select 
        c.id_comentario "id_comentario",
        c.titulo "titulo",
        c.descripcion "descripcion",
        u.nombre "autor",
        c.id_usuario "id_usuario",
        c.fecha "fecha",
        c.id_producto "id_producto",
        c.estatus "estatus",
        c.respuesta "respuesta",
        c.punteo "punteo"
    from comentario c, usuarios u
    where c.id_usuario = u.id_usuario`

async function find(context) {
    let query = baseQuery
    const binds = {}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql = 
   `INSERT INTO comentario(
        id_usuario,
        id_producto,
        descripcion,
        punteo,
        fecha,
        titulo,
        estatus
    ) VALUES (
        :id_usuario,
        :id_producto,
        :descripcion,
        :punteo,
        TO_CHAR(SYSDATE, 'DD-MM-YYYY'),
        :titulo,
        1
    )`

async function create(emp) {
    const comentario = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, comentario)

    return comentario
}

module.exports.create = create

const updateSql = 
   `UPDATE comentario
    SET respuesta = :respuesta
    WHERE id_comentario = :id_comentario`

async function update(emp) {
    const comentario = Object.assign({}, emp)

    const result = await database.simpleExecute(updateSql, emp) 

    if (result.rowsAffected && result.rowsAffected === 1) {
        return comentario
    } else {
        return null
    }
}

module.exports.update = update

const deleteSql = 
   `UPDATE comentario
    SET estatus = 0
    WHERE id_comentario = :id_comentario`

async function borra(emp) {
    const comentario = Object.assign({}, emp)
    const result = await database.simpleExecute(deleteSql, comentario)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return comentario;
    } else {
        return null;
    }
}

module.exports.borra = borra