import { createTable as createClient } from './tables/Client';
import { createTable as createProduct } from './tables/Product';
import { createTable as createClientProduct } from './tables/ClientProduct';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } = process.env;
export function getConnection() {
    const sequelize = new Sequelize({
        database: DB_NAME,
        username: DB_USER,
        host: DB_HOST,
        dialect: "postgres",
        port: 5432,
        password: DB_PASSWORD,
        logging: (sql) => {
            console.log("Query: %s", sql)
        }
    });
    return sequelize;
}

export async function createTables() {
    const connection = getConnection()
    const Client = await createClient(connection);
    const Product = await createProduct(connection);
    const ClientProduct = await createClientProduct(connection, Client.Schema, Product.Schema);
    return {
        Client,
        Product,
        ClientProduct
    }
}