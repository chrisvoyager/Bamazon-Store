DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE amiibo_list(
  amiibo_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  amiibo_name VARCHAR(100),
  amiibo_type VARCHAR(100),
  price VARCHAR(100),
  store_quantity INT,
  PRIMARY KEY (amiibo_id)
);

INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Lucas", "PSI", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Pokemon Trainer", "Trainer", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Wolf", "Star Fighter", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Fox", "Star Fighter", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Falco", "Star Fighter", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Mario", "Plumber", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Luigi", "Ghost Hunter", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Marth", "Prince", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Ike", "King", 2500, 100);
INSERT INTO amiibo_list (amiibo_name, amiibo_type, price, store_quantity)
VALUES ("Cloud", "Limit Breaker", 2500, 100);


