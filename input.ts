import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const rl: any = readline.createInterface({ input, output, terminal: false });
export async function validateInput(question: string, maxLength: number, type: any) {
    let userInput: any = await rl.question(question);
    while (!userInput || userInput.length > maxLength) {
        console.log("Wrong input, try again");
        userInput = await rl.question(question);
    }
    if (type === 'number') {
        while (isNaN(userInput)) {
            console.log("This is not a number");
            userInput = await rl.question(question);
        }
    }
    return userInput;
}
