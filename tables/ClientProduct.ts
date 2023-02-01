
import { ClientInterface } from './Client';
import { ProductInterface } from './Product';
import { ClientProductModel } from '../models/ClientProductModel';
import { DataTypes, Model, Sequelize } from 'sequelize';

type ClientProductSchemaModel = Model<ClientProductModel>

export interface ClientProductInterface {
    createClientProduct: (clientProduct: ClientProductModel) => Promise<ClientProductModel>
    readAllClient_Products: () => Promise<ClientProductModel[]>
}

export async function createTable(sequelize: Sequelize, Client: ClientInterface["Schema"], Product: ProductInterface["Schema"]):
    Promise<ClientProductInterface> {
    const ClientProductSchema = sequelize.define<ClientProductSchemaModel>('Client_product', {
        PurchaseNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PurchasePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DiscountPercentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DateAndTimeOfPurchase: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    } as any, {
        createdAt: false
    });

    Client.belongsToMany(Product, { through: ClientProductSchema });
    Product.belongsToMany(Client, { through: ClientProductSchema });

    await ClientProductSchema.sync();
    return {
        async createClientProduct(clientProduct) {
            const result = await ClientProductSchema.create(clientProduct);
            return result.toJSON();
        },
        async readAllClient_Products() {
            const clientsProducts = await ClientProductSchema.findAll();
            return clientsProducts.map((clientProduct) => clientProduct.toJSON());
        }
    }
}