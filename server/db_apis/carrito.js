const database = require('../services/database')

const baseQuery = 
   `SELECT 
        id_carrito "id_carrito",
        id_usuario "id_usuario",
        total "total",
        estado "estado"
    FROM CARRITO`

async function find(context) {
    let query = baseQuery
    const binds ={}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql = 
   `INSERT INTO carrito(
        id_usuario,
        total,
        estado,
    ) values (
        :id_usuario,
        0,
        1
    )`

async function create(emp) {
    const carrito = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, carrito)

    return carrito
}

module.exports.create = create

const updateSql = 
   `UPDATE carrito
    SET total = :total
    WHERE id_carrito = :id_carrito`

async function update(emp) {
    const carrito = Object.assign({}, emp) 

    const result = await database.simpleExecute(updateSql, emp)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return carrito
    } else {
        return null
    }
}

module.exports.update = update