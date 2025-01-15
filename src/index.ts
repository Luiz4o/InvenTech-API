import express from 'express'
import {config} from 'dotenv'
import { GetProductsController } from './controllers/get-products/get-products'
import { MysqlGetProductsRepository } from './repositories/get-products/mysql-get-products'
import { MysqlClient } from './database/mysql'

config()

const app = express()

const port = parseInt(process.env.PORT || '8000')

console.log('Tipo de port:', typeof port);

// app.get('/products',async (req, res) =>{
//     const mysqlGetProductsRepository = new MysqlGetProductsRepository

//     const getProductsController = new GetProductsController(mysqlGetProductsRepository)

//     const {body,statusCode} = await getProductsController.handle()

//     res.send(body).status(statusCode)
// }
// )

(async () => {
    try {
      await MysqlClient.connect();  // Conectando ao MySQL
  
      app.get('/products', async (req, res) => {
        const mysqlGetProductsRepository = new MysqlGetProductsRepository();
        const getProductsController = new GetProductsController(mysqlGetProductsRepository);
        const { body, statusCode } = await getProductsController.handle();
  
        res.status(statusCode).send(body);  // Corrigir a ordem do statusCode e body
      });
  
      // Iniciar o servidor Express
      app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      process.exit(1);  // Caso a conexão falhe, encerra o processo
    }
  })();

  process.on('SIGINT', async () => {
    await MysqlClient.disconnect();
    console.log('Conexão com MySQL encerrada.');
    process.exit();
  });

// app.listen(port, () => console.log(`listening on port${port}`))