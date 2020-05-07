const express = require('express')
const http = require('http')
const webServerConfig = require('../config/server')
const router = require('./router')
const database = require('./database')
const morgan = require('morgan')
const multer = require('multer')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer') //nuevo
const cors = require('cors')


let httpServer

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express()
        httpServer = http.createServer(app)
        //const io = require('socket.io')(httpServer)
        
        const storage = multer.diskStorage({
          destination: (req, res, callback) => {
              callback(null, './uploads')
          },
          filename: (req, file, callback) => {
              callback(null, file.originalname)
          }
        })
        
        const upload = multer({ storage: storage });

        app.use(cors())

        app.use('/uploads', express.static('uploads'))
        
        app.use(morgan('combined'))
        app.use(express.json({
          reviver: reviveJson
        }))
        app.use('/api', router)
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.get('/', async(req, res) => {
            const result = await database.simpleExecute('select user, systimestamp from dual')
            const user = result.rows[0].USER
            const date = result.rows[0].SYSTIMESTAMP

            res.end(`DB user: ${user}\nDate: ${date}`)
        })

        app.post('/imagenusuario', upload.single('userImage'), (req, res, next) => {
          res.end()
        })

        ///////
        app.post('/correoventa', (req, res, next) => {
          const cuerpo = req.body;
          armarEnviar(cuerpo)
          res.end()
        })

        app.post('/correocompra', (req, res, next) => {
          const cuerpo = req.body
          armarCompra(cuerpo)
          res.end()
        })

        app.post('/confirmacion', (req, res, next) => {
          const usuario = req.body
          enviarConfirmacion(usuario.correo)
          res.end()
        })

        app.post('/restablecer', (req, res, next) => {
          const usuario = req.body
          nuevaContrasenia(usuario)
          res.end()
        })

        /*io.on('connection', (socket) => {
          console.log('user connected')

          socket.emit('test event', 'here is some data')
        })*/
        ///////

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Servidor escuchando en localhost:${webServerConfig.port}`)

                resolve()
            })
            .on('error', () => {
                reject(err)
            })
    })
}

module.exports.initialize = initialize

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err)
          return
        }
   
        resolve()
      })
    })
  }
   
module.exports.close = close

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value)
  } else {
    return value
  }
}

async function armarCompra(usuario) {
  let correo = usuario.correo
  let productos = usuario.listado
  let contenido = await formarHtml(productos)
  enviarVenta(correo, contenido, 'Your bill 💲')
} 

async function armarEnviar(lista) {
  lista.forEach(async(element) => {
    const correo = element.email
    const contenido = await formarHtml(element.productos)
    enviarVenta(correo, contenido, 'Your products have been sold 😊')
  });
}

function formarHtml(productos) {
  let total = 0;
  let aux = 1;
  let tabla = '<table><tr><th>#</th><th>nombre</th><th>precio</th></tr>'
  productos.forEach(producto => {
    tabla += '<tr>'
    tabla += '<th>' + aux + '</th>'
    tabla += '<th>' + producto.nombre + '</th>'
    tabla += '<th>' + producto.precio + '</th>'
    tabla += '</tr>'
    aux++
    total = total + parseInt(producto.precio, 10)
  });
  tabla += '</table><h3>Total: $' + total + '</h3>'
  return tabla
}

async function enviarVenta(correo, html, asunto) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rickgamer96@gmail.com', // generated ethereal user
        pass: 'nintendo96' // generated ethereal password
    }
  });

  let info =  {
    from: 'rickgamer96@gmail.com', // sender address
    to: correo, // list of receivers
    text: 'Do not answer this email', // plain text body
    subject: asunto, // Subject line
    html: html
  }

  transporter.sendMail(info, function(error, info) {
    if(error) {
      console.log(error)
    } else {
      console.log('enviado con exito')
    }
  })

}

async function enviarConfirmacion(correo) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rickgamer96@gmail.com', // generated ethereal user
        pass: 'nintendo96' // generated ethereal password
    }
  });

  let info =  {
    from: 'rickgamer96@gmail.com', // sender address
    to: correo, // list of receivers
    text: 'Do not answer this email', // plain text body
    subject: 'Email confirmation', // Subject line
    html: '<h1>Welcome to alie store</h1><p>Follow the link to confirmate your password</p><a href="http://localhost:4200/success">Confirm!</a>'
  }

  transporter.sendMail(info, function(error, info) {
    if(error) {
      console.log(error)
    } else {
      console.log('enviado con exito')
    }
  })

}

async function nuevaContrasenia(usuario) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rickgamer96@gmail.com', // generated ethereal user
        pass: 'nintendo96' // generated ethereal password
    }
  });

  let info =  {
    from: 'rickgamer96@gmail.com', // sender address
    to: usuario.correo, // list of receivers
    text: 'Do not answer this email', // plain text body
    subject: 'New Password', // Subject line
    html: '<h1>New password Alie store</h1><p>Usuario: ' + usuario.correo + '</p><p>Contraseña nueva: ' + usuario.contrasenia + '</p>'
  }

  transporter.sendMail(info, function(error, info) {
    if(error) {
      console.log(error)
    } else {
      console.log('enviado con exito')
    }
  })

}