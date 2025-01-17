import express from 'express'
import multer from 'multer'
import cors from 'cors';
import { config } from 'dotenv'
import { GetProductsController } from './controllers/get-products/get-products'
import { MysqlGetProductsRepository } from './repositories/get-products/mysql-get-products'
import { MysqlClient } from './database/mysql'
import { MysqlCreateProductRepository } from './repositories/create-products/mysql-create-products'
import { CreateProductController } from './controllers/create-product/create-product'
import { MysqlUpdateProductRepository } from './repositories/update-product/mysql-update-product'
import { UpdateProductController } from './controllers/update-product/update-product'
import { MysqlDeleteProductRepository } from './repositories/delete-product/mysql-delete-product'
import { DeleteProductController } from './controllers/delete-product/delete-product'
import { MysqlCreateStockProductRepository } from './repositories/craete-stock-product/mysql-create-stock-product';
import { CreateStockProductController } from './controllers/create-stock-product/create-stock-product';
import { MysqlUpdateStockProductRepository } from './repositories/update-stock-product/mysql-update-stock-product';
import { UpdateStockProductsController } from './controllers/update-stock-product/update-stock-product';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const main = async () => {
  try {
    config()

    const app = express()

    app.use(express.json())

    app.use(cors({
      origin: 'http://localhost:3000', // Permite requisições apenas do frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      credentials: true, // Caso use cookies ou headers de autenticação
    }))

    const port = parseInt(process.env.PORT || '8000')

    await MysqlClient.connect()

    app.get('/products', async (req, res) => {
      const mysqlGetProductsRepository = new MysqlGetProductsRepository();
      const getProductsController = new GetProductsController(mysqlGetProductsRepository);
      const { body, statusCode } = await getProductsController.handle();

      res.status(statusCode).send(body);
    });

    app.post('/products', upload.single('image'), async (req, res) => {
      const mysqlCreateProductRepository = new MysqlCreateProductRepository()
      const createProductController = new CreateProductController(mysqlCreateProductRepository)

      const { body, statusCode } = await createProductController.handle({
        body: req.body,
        file: req.file
      })

      res.status(statusCode).send(body)
    })

    app.post('/stock', async (req, res) => {
      const mysqlCreateStockProductRepository = new MysqlCreateStockProductRepository()
      const createStockProductController = new CreateStockProductController(mysqlCreateStockProductRepository)

      const { body, statusCode } = await createStockProductController.handle({
        body: req.body
      })

      res.status(statusCode).send(body)
    })

    app.patch('/products/:id', async (req, res) => {
      const mysqlUpdateProductRepository = new MysqlUpdateProductRepository()
      const updateProductController = new UpdateProductController(mysqlUpdateProductRepository)

      const { body, statusCode } = await updateProductController.handle({
        body: req.body,
        params: req.params
      })

      res.status(statusCode).send(body)
    })

    app.patch('/stock/:id', async (req, res) => {
      const mysqlUpdateStockProductRepository = new MysqlUpdateStockProductRepository()
      const updateStockProductController = new UpdateStockProductsController(mysqlUpdateStockProductRepository)

      const { body, statusCode } = await updateStockProductController.handle({
        body: req.body,
        params: req.params
      })

      res.status(statusCode).send(body)
    })

    app.delete('/products/:id', async (req, res) => {
      const mysqlDeleteProductRepository = new MysqlDeleteProductRepository()
      const deleteProductController = new DeleteProductController(mysqlDeleteProductRepository)

      const { body, statusCode } = await deleteProductController.handle({
        params: req.params
      })

      res.status(statusCode).send(body)
    })

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