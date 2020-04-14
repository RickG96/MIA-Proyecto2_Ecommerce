const webServer = require('./services/server')
const database = require('./services/database')
const dbConfig = require('./config/database')


const defaultThreadPoolSize = 4

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize

async function startup() {
    console.log('Iniciando aplicacion')

    try {
        console.log('Iniciando modulo de base de datos');
     
        await database.initialize(); 
      } catch (err) {
        console.error(err);
     
        process.exit(1); // Non-zero failure code
      }

    try {
        console.log('Iniciando servidor web')

        await webServer.initialize()
    } catch(err) {
        console.error(err)

        process.exit(1)
    }
}

startup()

async function shutdown(e) {
    let err = e
      
    console.log('Apagando...')
   
    try {
      console.log('Cerrando sevidor web')
   
      await webServer.close()
    } catch (e) {
      console.log('Encountered error', e)
   
      err = err || e
    }

    try {
        console.log('Cerrando modulo de base de datos');
     
        await database.close(); 
      } catch (err) {
        console.log('Encountered error', e);
     
        err = err || e;
      }
   
    console.log('Saliendo del proceso')
   
    if (err) {
      process.exit(1) // Non-zero failure code
    } else {
      process.exit(0)
    }
  }
   
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM')
   
    shutdown()
  })
   
  process.on('SIGINT', () => {
    console.log('Received SIGINT')
   
    shutdown()
  })
   
  process.on('uncaughtException', err => {
    console.log('Uncaught exception')
    console.error(err)
   
    shutdown(err)
  })