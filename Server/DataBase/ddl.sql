CREATE TABLE IF NOT EXISTS User
(
    UserID VARCHAR(128) NOT NULL UNIQUE,
    UserCode VARCHAR(128) NOT NULL UNIQUE,
    Fname TEXT NOT NULL,
    Lname TEXT NOT NULL,
    Account_Status BIT DEFAULT 0 NOT NULL,
    Admin_Status BIT DEFAULT 0 NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Sales (
  sale_id INT PRIMARY KEY,
  date_time DATETIME NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Sale_items (
  sale_item_id INT PRIMARY KEY,
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS Payments (
  payment_id INTEGER PRIMARY KEY,
  sale_id INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_type TEXT CHECK(payment_type IN ('cash', 'credit_card', 'debit_card')) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(sale_id)
);