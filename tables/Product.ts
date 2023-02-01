import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import { ProductModel } from '../models/ProductModel';

type ProductSchemaModel = Model<ProductModel>

export interface ProductInterface {
    Schema: ModelStatic<ProductSchemaModel>
    createProduct: (product: Omit<ProductModel, "SKU">) => Promise<ProductModel>
    readAllProducts: () => Promise<ProductModel[]>

}
export async function createTable(sequelize: Sequelize): Promise<ProductInterface> {

    const ProductSchema = sequelize.define<ProductSchemaModel>('Product', {
        SKU: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        ProductName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ProductDescription: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PricePerCustomer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SatisfyingPurchasePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UnitsInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            createdAt: false,
        });
    await ProductSchema.sync();
    return {
        Schema: ProductSchema,
        async createProduct(product) {
            const result = await ProductSchema.create(product as ProductModel);
            return result.toJSON()
        },
        async readAllProducts() {
            const products = await ProductSchema.findAll();
            return products.map((product) => product.toJSON());
        }
    };
}
export type ProductTable = Awaited<ReturnType<typeof createTable>>;