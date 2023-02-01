import { createTables } from "./DbConnection";
import { getUserData} from "./application";

async function dataToDB() {
    const DB = await createTables();

    const clientData = await getUserData();
    const Client = await DB.Client.createClient({
        IDnumber:clientData.IDnumber,
        FirstName:clientData.FirstName,
        LastName:clientData.LastName,
        Address:clientData.Address,
        PhoneNumber:clientData.PhoneNumber
    });
    console.log(Client);

   
    // const product = await DB.Product.createProduct({
    //     name: 'Apple',
    //     productNumber: 344343,
    //     department: 'Fruits'
    // });
    // console.log(product);
    

    
    const readAllClient = await DB.Client.readAllClient();
    console.log(readAllClient);

    // const readAllProducts = await DB.Product.readAllProducts();
    // console.log(readAllProducts);

    // const userProduct = await DB.userProduct.createUserProduct({
    //     userId: user.id,
    //     productId: product.id
    // });
    // console.log(userProduct);
    // const readAllUsers_Products = await DB.userProduct.readAllUsers_Products();
    // console.log(readAllUsers_Products);

}

dataToDB().then(() => {
    console.log("Exiting")
});
