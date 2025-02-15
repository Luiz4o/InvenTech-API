import mysql from "mysql2/promise";
import { DataTypes, Model, ModelCtor, ModelStatic, Sequelize } from "sequelize";
import { config } from "dotenv";
import { badRequest, serverError } from "../controllers/helpers";

config();

export const MysqlClient = {
  client: null as mysql.Connection | null,
  seq: null as Sequelize | null,
  ProductsTableModel: null as ModelStatic<Model<any, any>> | null,
  StockProductsTableModel: null as ModelStatic<Model<any, any>> | null,
  UsersTableModel: null as ModelStatic<Model<any, any>> | null,

  async createTables(): Promise<void> {
    try {
      const ProductsTableModel = this.seq?.define("products", {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        nameProduct: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
        },
        image: {
          type: DataTypes.BLOB,
        },
      },
        {
          timestamps: false,
        }
      );

      const StockProductsTabelModel = this.seq?.define("stock", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        productId: {
          type: DataTypes.BIGINT,
          references: {
            model: ProductsTableModel,
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
        {
          timestamps: false,
        }
      );

      const UsersTableModel = this.seq?.define("users", {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
        {
          timestamps: false,
        }
      );

      if (!ProductsTableModel || !StockProductsTabelModel || !UsersTableModel) {
        throw new Error("Erro ao acessar a tabela");
      }

      this.ProductsTableModel = ProductsTableModel;
      this.StockProductsTableModel = StockProductsTabelModel;
      this.UsersTableModel = UsersTableModel

      ProductsTableModel.hasOne(StockProductsTabelModel, {
        foreignKey: "productId",
        onDelete: "CASCADE"
      });

      StockProductsTabelModel.belongsTo(ProductsTableModel, {
        foreignKey: "productId"
      });

      await this.seq?.sync({ force: false })
    } catch (error) {
      throw new Error("Falha ao criar o produto")
    }
  },

  async connect(): Promise<void> {
    const host = process.env.MYSQL_HOST || "localhost"
    const port = parseInt(process.env.MYSQL_PORT || "3306")
    const user = process.env.MYSQL_USERNAME || "root"
    const password = process.env.MYSQL_PASSWORD || ""
    const database = process.env.MYSQL_DATABASE || "test"

    try {
      this.seq = new Sequelize({
        dialect: "mysql",
        host: host,
        database: "inventech",
        username: user,
        password: password,
      });
      this.seq.authenticate()

      console.log("Connection has been established successfully.");

      await this.createTables();

    } catch (error) {
      console.error("Erro ao conectar ao MySQL:", error);
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      console.log("Conexão ao MySQL encerrada.");
    }
  },
};
