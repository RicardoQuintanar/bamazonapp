DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40),
    department_name VARCHAR (40),
    price INTEGER,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (products_name, price, stock_quantity)
VALUES
("xbox", "Electronics", 400, 100),
("batteries", "Electronics", 5, 400),
("cat food", "Pet Supplies", 15, 200),
("dog food", "Pet Supplies", 30, 150),
("Shampoo", "Cosmetics", 400, 100),
("Conditioner", "Cosmetics", 400, 100),
("Couch", "HomeDecor", 900, 50),
("Wood Table", "HomeDecor", 1200, 20),
("Lawn Mower", "Lawn Care", 250, 300),
("Water Hose", "Lawn Care", 50, 100);

SELECT FROM * products;

CREATE TABLE departments(
    deparment_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(deparment_id)
);

INSERT INTO deparments (department_name)
VALUES
("Electronics"),
("Pet Supplies"),
("Cosmetics"),
("HomeDecor"),
("Lawn Care");