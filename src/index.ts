import express from 'express'
import {config} from 'dotenv'
import { GetProductsController } from './controllers/get-products/get-products'
import { MysqlGetProductsRepository } from './repositories/get-products/mysql-get-products'
import { MysqlClient } from './database/mysql'


const main =async () => {
    try {
      config()

      const app = express()

      const port = parseInt(process.env.PORT || '8000')

      await MysqlClient.connect();
  
      app.get('/products', async (req, res) => {
        const mysqlGetProductsRepository = new MysqlGetProductsRepository();
        const getProductsController = new GetProductsController(mysqlGetProductsRepository);
        const { body, statusCode } = await getProductsController.handle();
  
        res.status(statusCode).send(body);  
      });

      app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      process.exit(1); 
    }
  };

  process.on('SIGINT', async () => {
    await MysqlClient.disconnect();
    console.log('Conexão com MySQL encerrada.');
    process.exit();
  });

main()

// app.listen(port, () => console.log(`listening on port${port}`))