const yargs = require('yargs');
const fs = require("fs");
const filePath = "expenses.json"
//--------------------------------------------- Verify wether "tasks.jason" exist
function ensureFileExist(){
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,JSON.stringify([]));
        console.log("You didn't have the Storage file ,then it was created now.\n")
    }
}
//--------------------------------------------- Commads
yargs
    .command({
        command: "add",
        describe: "Adds a new registry about the expense to the storage file",
        builder:{
            description:{
                describe: "A description for the expense created",
                demandOption: true,
                type: "string",
            },
            amount:{
                describe: "The quantity spend in the expense",
                demandOption: true,
                type: "number",
            },
        },
        handler(argv){
            ensureFileExist();
            const expenses = JSON.parse(fs.readFileSync(filePath,"utf-8"));
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];

            const newExpense = {
                id: expenses.length + 1,
                date: formattedDate,
                description: argv.description,
                amount: argv.amount,
            }
            expenses.push(newExpense);
            fs.writeFileSync(filePath,JSON.stringify(expenses,null,2));
            console.log("Expense registred :)");
        }
    })
    .command({
        command: "update",
        describe: "Update a exist registry on the storage file",
        builder:{
            id:{
                describe: "The ID of the expense that will be updated",
                demandOption: true,
                type: "number",
            },
            description:{
                describe: "A new description for the expense that will be updated",
                demandOption: false,
                type: "string",
            },
            amount:{
                describe: "The quantity updated spend in the expense",
                demandOption: false,
                type: "number",
            },
        },
        handler(argv){
            ensureFileExist();
            const expenses = JSON.parse(fs.readFileSync(filePath,"utf-8"));
            if(expenses < argv.id){console.log("This ID doesn't exist!");return null;}
            if(argv.description){
                expenses[argv.id -1].description = argv.description;
            }
            if(argv.amount){
                expenses[argv.id -1].amount = argv.amount;
            }
            fs.writeFileSync(filePath,JSON.stringify(expenses,null,2));
            console.log("Expense updated :)");
        }
    })
    .command({
        command: "delete",
        describe: "Remove a resgistry of a expense on the storage file",
        builder:{
            id:{
                describe: "The ID of the expense that will be removed",
                demandOption: true,
                type: "number",
            },
        },
        handler(argv){
            ensureFileExist();
            const expenses = JSON.parse(fs.readFileSync(filePath,"utf-8"));
            if(expenses.length < argv.id){console.log("This ID doesn't exist!");return null;}
            expenses.splice(argv.id -1,1);
            for(let i = argv.id - 1; i < expenses.length; i++){
                expenses[i].id = expenses[i].id -1;
            }
            fs.writeFileSync(filePath,JSON.stringify(expenses,null,2));
            console.log("Expense deleted :)");
        }
    })
    .command({
        command: "list",
        describe: "Dislay all expenses in a table",
        handler(){
            ensureFileExist();
            const expenses = JSON.parse(fs.readFileSync(filePath,"utf-8"));
            if(expenses.length < 1){console.log("There are no expenses for list!");return null;}
            expenses.forEach(expense => {
                console.log(`ID:[${expense.id}] \n DATE: ${expense.date} \n Description:"${expense.description}"\n Amount: $${expense.amount.toFixed(2)}\n`);
            });
        }
        
    })
    .command({
        command: "total",
        describe: "The sum of all expenses or only for the selected month",
        builder:{
            month:{
                decribe: "Wich month the person want to see the total if null return all months",
                demandOption: false,
                type: "number",
            },
        },
        handler(argv){
            ensureFileExist();
            const expenses = JSON.parse(fs.readFileSync(filePath,"utf-8"));
            if(expenses.length < 1){console.log("There are no expenses for list!");return null;}
            let total = 0;
            if(argv.month){
                let selectMonth = expenses.filter((expense) =>{
                    let dateObj = new Date(expense.date);
                    let month = dateObj.getMonth() + 1;
                    return month === argv.month;
                });
                for(let i = 0; i < selectMonth.length; i++){
                    total += selectMonth[i].amount;
                }
            } else {
                for(let i = 0; i < expenses.length; i++){
                    total += expenses[i].amount;
                }
            }
            console.log(`Total: $${total.toFixed(2)}`);
        }
    })  

yargs.parse(); 
