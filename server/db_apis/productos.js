const database = require('../services/database')

const baseQuery = 
   `SELECT
        p.id_producto "id_producto",
        p.nombre "nombre",
        p.descripcion "descripcion",
        p.imagen "imagen",
        p.precio "precio",
        p.fecha_pubi "fecha",
        p.cantidad "cantidad",
        p.color "color",
        p.id_usuario "id_usuario",
        p.estatus "estatus",
        c.nombre "duenio"
    FROM producto p, usuarios c
    WHERE p.id_usuario = c.id_usuario`

async function find(context) {
    let query = baseQuery
    const binds = {}


    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const createSql =
   `INSERT INTO producto(
        nombre,
        descripcion,
        imagen,
        precio,
        fecha_pubi,
        cantidad,
        color,
        id_usuario,
        estatus
    ) VALUES (
        :nombre,
        :descripcion,
        :imagen,
        :precio,
        TO_CHAR(SYSDATE, 'DD-MM-YYYY'),
        :cantidad,
        :color,
        :id_usuario,
        1
    )`

async function create(emp) {
    const producto = Object.assign({}, emp)

    const result = await database.simpleExecute(createSql, producto)

    return producto
}

module.exports.create = create

const updateSql = 
   `UPDATE producto
    SET nombre = :nombre,
        descripcion = :descripcion,
        precio = :precio,
        cantidad = :cantidad,
        color = :color
    WHERE id_producto = :id_producto`

async function update(emp) {
    const producto = Object.assign({}, emp)
    const result = await database.simpleExecute(updateSql, producto)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return producto
    } else {
        return null
    }
}

module.exports.update = update

const deleteSql = 
   `UPDATE producto
    SET estatus = 0
    WHERE id_producto = :id_producto`

async function borra(emp) {
    const producto = Object.assign({}, emp)
    const result = await database.simpleExecute(deleteSql, producto)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return producto;
    } else {
        return null;
    }
}

module.exports.borra = borra