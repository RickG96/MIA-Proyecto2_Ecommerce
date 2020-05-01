const database = require('../services/database')

const baseQuery =
   `SELECT
        id_producto "id_producto",
        id_categoria "id_categoria"
    FROM categoria_producto`

async function find(context) {
    let query = baseQuery
    const binds = {}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql =
   `INSERT INTO categoria_producto(
        id_categoria,
        id_producto
    ) values (
        :id_categoria,
        :id_producto
    )`

async function create(emp) {
    const catpro = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, catpro)

    return catpro
}

module.exports.create = create