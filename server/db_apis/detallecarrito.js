const database = require('../services/database')

const baseQuery = 
    `select 
        d.id_detalle "id_detalle",
        d.id_carrito "id_carrito",
        d.id_producto "id_producto",
        p.precio "precio",
        p.nombre "nombre",
        p.imagen "imagen",
        p.id_usuario "id_usuario",
        d.estado "estado"
    from detalle_carrito d, producto p
    where d.id_producto = p.id_producto`

async function find(context) {
    let query = baseQuery

    const binds = {}

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql = 
   `INSERT INTO detalle_carrito(
        id_carrito,
        id_producto,
        estado
    ) values (
        :id_carrito,
        :id_producto,
        1
    )`

async function create(emp) {
    const detalle = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, detalle)

    return detalle
}

module.exports.create = create

const deleteSql = 
   `UPDATE detalle_carrito
    SET estado = 0
    WHERE id_detalle = :id_detalle`

async function borra(emp) {
    const detalle = Object.assign({}, emp) 
    const result = await database.simpleExecute(deleteSql, detalle)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return detalle;
    } else {
        return null;
    }
}

module.exports.borra = borra

const updateSql = 
   `UPDATE detalle_carrito
    SET estado = 2
    WHERE id_detalle = :id_detalle`

async function update(emp) {
    const detalle = Object.assign({}, emp) 
    const result = await database.simpleExecute(updateSql, detalle)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return detalle;
    } else {
        return null;
    }
}

module.exports.update = update