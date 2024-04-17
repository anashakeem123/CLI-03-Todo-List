#! /usr/bin/env node

// Importing required libraries:
import inquirer from "inquirer";
import chalk from "chalk"; 


// Initializing todo list with some default items:
let todo : string [] = []

// Displaying welcome message using chalk for styling:
console.log(chalk.bgYellow.green.underline.italic(`\n\t\t\t*Welcome To The Todo List*\t\n`)); // Print The Message:

// Asynchronous function to create and manage the todo list:
async function  createtodo(todo:string[]) {
    
    // Infinite loop to keep the program running until explicitly exited:
    do{
    
    // Prompting user to select an operation:   
    let Operation = await inquirer.prompt([
        {
            type: "list",
            name: "operator",
            message: (chalk.bgBlue.white("What You want to do?")), // Print The Message:
            choices: ["Add","View","Update","Delete","Exit"]
        }
    ])

    // Adding a new item to the todo list:
    if(Operation.operator == "Add"){
       let add = await inquirer.prompt([
        {
           type: "input",
           name: "add_items",
           message: (chalk.bgGreen.white('"Please Add items"')) // Print The Message:

        }
       ])
       todo.push(add.add_items)
       console.log(todo);
    }
    
    // Viewing the current todo list:
    if (Operation.operator === "View"){
        console.log(todo);
    }

    // Updating an existing item in the todo list:
    if(Operation.operator === "Update"){
        let Update = await inquirer.prompt(
            {
                type: "list",
                name: "updateitems",
                message: (chalk.bgRed.blue('"What You want to do?"')), // Print The Message:
                choices: todo
            }
            
        )
        let Update2 = await inquirer.prompt({
            
                type: "input",
                name: "updateitem2",
                message: (chalk.bgWhite.green('"Update items"')) // Print The Message:
             
        })
        let newtodo = todo.filter(val=>val != Update.Update2)
        todo=[...newtodo,Update2.updateitem2]
       
    }

    // Deleting an item from the todo list:
    if(Operation.operator === "Delete"){
        let remove = await inquirer.prompt(
            {
                type: "list",
                name: "removeitems",
                message: (chalk.bgYellow.red('"select items to delete"')), // Print The Message:
                choices: todo
            }
        )

        // Prompting for confirmation before deleting:
        if(Operation.operator !== "Exit"){
            let exit = await inquirer.prompt({
                type: "confirm",
                name: "exit",
                message: "Exit this...." // Print Message:
            })

            // If user confirms to exit, break the loop:
            if(exit.exit){
                break; // Breake this:
            }
        }
    }
    
}
while(true) // End of the loop:
}
createtodo(todo); // Calling the function to start the todo list application: