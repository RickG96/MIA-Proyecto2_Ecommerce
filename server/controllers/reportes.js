const database = require('../services/database')

async function get(req, res, next) {
    try {
        let opcion = parseInt(req.params.id, 10)
        console.log(opcion)
        if(opcion == 1) {
            let rep = {
                anio: req.body.anio
            }
            let rows = await reporte1(rep)
            res.status(200).json(rows)
        } else if(opcion == 2) {
            let rep = {
                anio: req.body.anio
            }
            let rows = await reporte2(rep)
            res.status(200).json(rows)
        } else if(opcion == 3) {
            let rows = await reporte3()
            res.status(200).json(rows)
        } else if(opcion == 4) {
            let rep = {
                estrellas: req.body.estrellas
            }
            let rows = await reporte4(rep)
            res.status(200).json(rows)
        } else if(opcion == 5) {
            let rows = await reporte5()
            res.status(200).json(rows)
        } else if(opcion == 6) {
            let rows = await reporte6()
            res.status(200).json(rows)
        } else if(opcion == 7) {
            let rows = await reporte7()
            res.status(200).json(rows)
        } else if(opcion == 8) {
            let rep = {
                fecha: req.body.fecha
            }
            let rows = await reporte8(rep)
            res.status(200).json(rows)
        } else if(opcion == 9) {
            let rep = {
                cantidad: req.body.cantidad
            }
            let rows = await reporte9(rep)
            res.status(200).json(rows)
        } else if(opcion == 10) {
            let rows = await reporte10()
            res.status(200).json(rows)
        }
        
    } catch(err) {
        next(err)
    }
}

module.exports.get = get

const rep1Sql = 
   `select 
        nombre "nombre", 
        apellido "apellido", 
        correo "correo" 
    from usuarios
    where trunc(extract(year from to_date(fecha_nacimiento, 'DD-MM-YYYY'))) > trunc(extract(year from to_date(:anio, 'DD-MM-YYYY')))
    and genero = 'masculino'
    and tipo_usuario = 2`

async function reporte1(context) {
    const binds = {}
    binds.anio = context.anio
    const result = await database.simpleExecute(rep1Sql, binds)
    return result.rows
}

const rep2Sql = 
    `select 
        u.nombre "nombre", 
        u.apellido "apellido", 
        u.correo "correo" 
    from usuarios u
    where trunc(extract(year from to_date(u.fecha_nacimiento, 'DD-MM-YYYY'))) < trunc(extract(year from to_date(:anio, 'DD-MM-YYYY')))
    and u.genero = 'femenino'
    and u.tipo_usuario = 1`

async function reporte2(context) {
    const binds = {}
    binds.anio = context.anio
    const result = await database.simpleExecute(rep2Sql, binds)
    return result.rows
}

const rep3Sql = 
    `select
        p.id_usuario "id_usuario",
        count(p.id_usuario) "productos_vendidos",
        sum(to_number(p.precio)) "ganado"
    from detalle_carrito d, producto p
    where d.id_producto = p.id_producto
    and d.estado = 2
    group by p.id_usuario
    order by sum(to_number(p.precio))
    desc`

async function reporte3() {
    const binds = {}
    const result = await database.simpleExecute(rep3Sql, binds)
    return result.rows
}

const rep4Sql =
   `select 
        p.id_producto,
        p.nombre,
        to_number(trunc(avg((to_number(c.punteo)/20)),0)) punteo
    from comentario c, producto p
    where p.id_producto = c.id_producto
    group by p.id_producto, p.nombre
    having to_number(trunc(avg((to_number(c.punteo)/20)),0)) = :estrellas
    order by punteo
    desc`

async function reporte4(context) {
    const binds = {}
    binds.estrellas = context.estrellas
    const result = await database.simpleExecute(rep4Sql, binds)
    return result.rows
}

const rep5Sql = 
   `select 
        d.id_producto "id_producto",
        p.nombre "nombre_producto",
        count(d.id_producto) "vendidos"
    from detalle_carrito d, producto p
    where d.id_producto = p.id_producto
    and d.estado = 2
    group by d.id_producto, p.nombre
    order by count(d.id_producto)
    desc
    fetch first 3 rows only`

async function reporte5() {
    const binds = {}
    const result = await database.simpleExecute(rep5Sql, binds)
    return result.rows
}

const rep6Sql = 
`select
u.id_usuario id_usario,
u.nombre nombre,
count(p.id_usuario) productos
from producto p, usuarios u
where p.id_usuario = u.id_usuario
group by u.id_usuario, u.nombre
order by count(p.id_usuario)
desc
fetch first 3 rows only`

async function reporte6() {
    const binds = {}
    const result = await database.simpleExecute(rep6Sql, binds)
    return result.rows
}

const rep7Sql = 
`select
    p.id_producto "id_producto",
    p.nombre "nombre",
    c.nombre "categoria"
from categoria_producto r, producto p, categoria c
where r.id_producto = p.id_producto
and r.id_categoria = c.id_categoria`

async function reporte7() {
    const binds = {}
    const result = await database.simpleExecute(rep7Sql, binds)
    return result.rows
}

const rep8Sql =
`select
    p.nombre "nombre",
    count(*) "comentarios"
from comentario c, producto p
where c.id_producto = p.id_producto
and to_date(c.fecha, 'DD-MM-YYYY') = to_date(:fecha, 'DD-MM-YYYY')
group by p.nombre
order by p.nombre`

async function reporte8(context) {
    const binds = {}
    binds.fecha = context.fecha
    const result = await database.simpleExecute(rep8Sql, binds)
    return result.rows
}

const rep9Sql = 
`select  
    nombre,
    descripcion
from producto 
where cantidad = :cantidad`

async function reporte9(context) {
    const binds = {}
    binds.cantidad = context.cantidad
    const result = await database.simpleExecute(rep9Sql, binds)
    return result.rows
}

const rep10Sql =
`select 
    p.id_producto,
    p.nombre,
    to_number(trunc(avg((to_number(c.punteo)/20)),0)) punteo
from comentario c, producto p
where p.id_producto = c.id_producto
group by p.id_producto, p.nombre
order by punteo
asc
fetch first 3 rows only`

async function reporte10() {
    const binds = {}
    const result = await database.simpleExecute(rep10Sql, binds)
    return result.rows
}