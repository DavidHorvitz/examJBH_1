import { ClientModel } from '../models/clientModel';
import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';


type ClientSchemaModel = Model<ClientModel>

export interface ClientInterface {
    Schema: ModelStatic<ClientSchemaModel>
    createClient: (client: ClientModel) => Promise<ClientModel>
    readAllClient: () => Promise<ClientModel[]>
}

export async function createTable(sequelize: Sequelize): Promise<ClientInterface> {

    const ClientSchema = sequelize.define<ClientSchemaModel>('Client', {
        IDnumber: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER,
        },
        FirstName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        PhoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            createdAt: false,
        });

    await ClientSchema.sync();
    return {
        Schema: ClientSchema,
        async createClient(client) {
            const result = await ClientSchema.create(client as ClientModel);
            return result.toJSON()
        },

        async readAllClient() {
            const clients = await ClientSchema.findAll();
            return clients.map((client) => client.toJSON());
        }

    };
}
export type ClientTable = Awaited<ReturnType<typeof createTable>>;