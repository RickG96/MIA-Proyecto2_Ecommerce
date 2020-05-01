const database = require('../services/database')

const baseQuery = 
   `SELECT
        id_categoria "id_categoria",
        nombre "nombre",
        descripcion "descripcion",
        id_padre "id_padre",
        estatus "estatus"
    FROM categoria`

async function find(context) {
    let query = baseQuery
    const binds = {}

    if(context.id) {
        binds.id_categoria = context.id
        query += `\nWHERE id_categoria = :id_categoria`
    }

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql = 
   `INSERT INTO categoria(
        nombre,
        descripcion,
        estatus,
        id_padre
    ) values (
        :nombre,
        :descripcion,
        1,
        :id_padre
    )`

async function create(emp) {
    const categoria = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, categoria)

    return categoria
}

module.exports.create = create

const updateSql = 
   `UPDATE categoria
    SET descripcion = :descripcion
    WHERE id_categoria = :id_categoria`

async function update(emp) {
    const categoria = Object.assign({}, emp)
    const result = await database.simpleExecute(updateSql, categoria)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return categoria
    } else {
        return null
    }
}

module.exports.update = update

const deleteSql = 
   `UPDATE categoria
    SET estatus = 0
    WHERE id_categoria = :id_categoria`

async function borra(emp) {
    const categoria = Object.assign({}, emp)
    const result = await database.simpleExecute(deleteSql, categoria)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return categoria;
    } else {
        return null;
    }
}

module.exports.borra = borra