import { validateInput } from "./input";
export async function getUserData() {
    const ID: string = await validateInput("Enter your first name: ", 10, "string");
    const IDnumber:number = parseInt(ID);
    const FirstName: string = await validateInput("Enter your last name: ", 10, "string");
    const LastName: string = await validateInput("Enter your last name: ", 10, "string");
    const Address: string = await validateInput("Enter your last name: ", 10, "string");
    const Phone: string = await validateInput("Enter your last name: ", 10, "string");
    const PhoneNumber:number = parseInt(Phone);

    return { IDnumber, FirstName,LastName,Address,PhoneNumber};
}
// export async function getProductData() {
//     const name: string = await validateInput("Enter your first name: ", 10, "string");
//     const productNumber: string = await validateInput("Enter your last name: ", 10, "string");
//     const department: string = await validateInput("Enter your birthday (YYYY-MM-DD): ", 10, "string");
//     return { name, productNumber, department };
// }