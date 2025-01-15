import mysql from 'mysql2/promise'
import {config} from 'dotenv'

config()


export const MysqlClient = {
    connection: null as mysql.Connection | null,


    async connect(): Promise<void> {
        const host = process.env.MYSQL_HOST || 'localhost';
    const port = parseInt(process.env.MYSQL_PORT || '3306');
    const user = process.env.MYSQL_USERNAME || 'root';
    const password = process.env.MYSQL_PASSWORD || '';
    const database = process.env.MYSQL_DATABASE || 'test';

    try {
      this.connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
      });
      console.log('Conexão ao MySQL estabelecida com sucesso!');
      const [rows] = await this.connection.execute('SELECT 1 AS result');
      console.log('Teste de conexão bem-sucedido. Resultado:', rows);

    } catch (error) {
      console.error('Erro ao conectar ao MySQL:', error);
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      console.log('Conexão ao MySQL encerrada.');
    }
  },
};