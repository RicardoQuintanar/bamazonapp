var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 80,
    user: "root",
    password: "Rq6io669!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    displayTable();
});

var displayTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({ head: ["Item ID", "Product", "Department", "Price", "Quantity"] });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }

        console.log(table.toString());

        startShopping(res);
    })
}

var startShopping = function (res) {
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Please type the product ID you would like to purhcase.",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ])
        .then(function (answer) {
            var chosenProduct;
            var input;
            for (var i = 0; i < res.length; i++) {
                if (parseInt(answer.productId) === res[i].item_id && res[i].stock_quantity <= 0) {
                    console.log("We are sorry out of stock! Please is there something else you would like?");
                    startShopping(res);
                } else if (parseInt(answer.productId) === res[i].item_id) {
                    chosenProduct = res[i];
                    input = answer;
                    customerOrder(chosenProduct, input);
                }
            }
        })
}

var customerOrder = function (chosenProduct, input) {
    var newQuantity = chosenProduct.stock_quantity - input.quantity;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: input.productId
            }
        ],
        function (err) {
            if (err) throw err;
            connection.query("SELECT * FROM products WHERE item_id=?",
                [
                    input.productId
                ],
                function (err, res) {
                    if (err) throw err;
                    var total = input.quantity * res[0].price;
                    var quantityPurchased = input.quantity;
                    var itemPurchased = res[0].product_name;
                    console.log("Items purchased " + quantityPurchased + " " + itemPurchased + "(s) for a total of $" + total + ".");
                    continueShopping();
                }
            )
        }
    )
}

var continueShopping = function () {
    inquirer.prompt([
        {
            name: "buyMore",
            type: "confirm",
            message: "Would you like to continue shopping?",
        }
    ]).then(function (input) {
        if (input.buyMore) {
            displayTable()
        } else {
            console.log("Thank you for shopping, have a Great Day!");
            connection.end();
        }
    })
}