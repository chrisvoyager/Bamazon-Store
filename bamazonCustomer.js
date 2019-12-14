var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayShop();
});

function displayShop() {
    connection.query('SELECT * FROM amiibo_list', function (err, results) {
        if (err) { console.log(err) };
        const amiiboTable = new Table({
            head: ['ID', 'Name', 'Type', 'Price', 'Quantity'],
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });
        for (var i = 0; i < results.length; i++) {
            amiiboTable.push([results[i].amiibo_id,
            results[i].amiibo_name,
            results[i].amiibo_type,
            results[i].price,
            results[i].store_quantity]);
        };
        console.log(amiiboTable.toString());
        inquirer.prompt([
            {
                name: 'shop',
                type: 'confirm',
                message: 'Welcome to the shop! Is there anything that catches your eye?'
            }
        ]).then(answers => {
            if (answers.shop === true) {
                promptUser();
            }
            else {
                connection.end();
            }
        });
    });
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'ID',
            type: 'input',
            message: 'Please enter the ID of the Amiibo you would like to buy.',
            filter: Number
        },
        {
            name: 'Quantity',
            type: 'input',
            message: 'How many would you like to buy?',
            filter: Number
        }
    ]).then(answers => {
        var amiiboChoice = answers.ID;
        var amiiboQuantity = answers.Quantity;
        console.log(amiiboChoice)
        console.log(amiiboQuantity)
        calcOrder(amiiboChoice, amiiboQuantity);
    });
}

function calcOrder(amiiboChoice, amiiboQuantity) {
    connection.query('SELECT * FROM amiibo_list WHERE amiibo_id = ' + amiiboChoice, function (err, results) {
        console.log(results[0]);
        if (err) { console.log(err) };
        if (amiiboQuantity <= results[0].store_quantity) {
            const totalPrice = results[0].price * amiiboQuantity;
            console.log("Congratulations! You are now the proud owner of " + amiiboQuantity + " Amiibo!")
            console.log("Your total cost is: " + totalPrice);
            connection.query("UPDATE amiibo_list SET store_quantity = store_quantity - " + amiiboQuantity + " WHERE amiibo_id = " + amiiboChoice);
            displayShop();
        }
        else {
            console.log("Sorry, we don't have enough amiibo to fill this order!")
            inquirer.prompt([
                {
                    name: 'retry',
                    type: 'confirm',
                    message: 'Would try adopting again?'
                }
            ]).then(answers => {
                if (answers.retry === true) {
                    promptUser();
                }
                else {
                    connection.end();
                }
            })
        }
    });
}