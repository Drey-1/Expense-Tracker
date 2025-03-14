# Expense Tracker
Idea : https://roadmap.sh/projects/expense-tracker

Expense Tracker is a command-line tool for managing expenses simply and efficiently.
# 🚀Usage

This document demonstrates how to use the **Expense Tracker** with several basic commands for adding, listing, summarizing, and deleting expenses.

## Adding Expenses

To add an expense, use the `add` command specifying the description and the amount.

```bash
expense-tracker add --description "Lunch" --amount 20
expense-tracker add --description "Dinner" --amount 10
```

## Updating an Expense
If you need to update an expense, use the `update` command by specifying the expense ID and the description or amount:

```
expense-tracker update --id 2 --amount 13
expense-tracker update --id 2 --description "Bought bread"
expense-tracker update --id 2 --amount 13 --description "Bought bread"
```

## Deleting an Expense
If you need to remove an expense, use the `delete` command by specifying the expense ID:

```
expense-tracker delete --id 2
```

## Listing Expenses
Use the `list` command to display all recorded expenses:

```
expense-tracker list
```
## Summarizing Expenses
To view the total expenses, use the `total` command:

```
expense-tracker total
```
You can also obtain a summary for a specific month (for example, August):

```
expense-tracker total --month 8
```

# 🛠 Technologies Used
- Node.js
- JSON for data storage
- yargs.js for CLI increment
# 📜 License
This project is licensed under the MIT License.


