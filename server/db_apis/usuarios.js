const database = require('../services/database')
const oracledb = require('oracledb')

const baseQuery = 
    `SELECT
        id_usuario "id_usuario",
        nombre "nombre",
        apellido "apellido",
        correo "correo",
        contrasenia "contrasenia",
        telefono "telefono",
        direccion "direccion",
        fotografia "fotografia",
        genero "genero",
        fecha_nacimiento "nacimiento",
        tipo_usuario "tipo_usuario",
        credito "credito",
        membresia "membresia",
        estatus "estatus"
     FROM usuarios`

async function find(context) {
    let query = baseQuery
    const binds = {}

    if(context.id) {
        binds.id_usuario = context.id
        query += `\nWHERE id_usuario = :id_usuario`
    }

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find

const deleteSql = 
   `UPDATE usuarios
    SET estatus = 0
    WHERE id_usuario = :id_usuario`

async function borra(emp) {
    const usuario = Object.assign({}, emp)
    const result = await database.simpleExecute(deleteSql, usuario)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return usuario;
    } else {
        return null;
    }
}

module.exports.borra = borra

const updateSql = 
   `UPDATE usuarios
    SET nombre = :nombre,
        apellido = :apellido,
        contrasenia = :contrasenia,
        telefono = :telefono,
        direccion = :direccion
    WHERE id_usuario = :id_usuario`

async function update(emp) {
    const usuario = Object.assign({}, emp)
    const result = await database.simpleExecute(updateSql, usuario)

    if (result.rowsAffected && result.rowsAffected === 1) {
        return usuario;
    } else {
        return null;
    }
}

module.exports.update = update