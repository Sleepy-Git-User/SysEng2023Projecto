CREATE TABLE IF NOT EXISTS User
(
    UserID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    Fname TEXT NOT NULL,
    Lname TEXT NOT NULL,
    Account_Status BIT DEFAULT 0 NOT NULL,
    Admin_Status BIT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
  ProductID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  Description TEXT,
  Price DECIMAL(10, 2) NOT NULL,
  Stock INT DEFAULT 0 NOT NULL,
  Category VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS Sales (
  SaleID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  DateTime DATETIME NOT NULL,
  TotalAmount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS SaleItems (
  SaleItemID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  SaleID VARCHAR NOT NULL,
  ProductID VARCHAR NOT NULL,
  Quantity INT NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (SaleID) REFERENCES Sales(SaleID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE IF NOT EXISTS Payments (
  PaymentID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  SaleID VARCHAR NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  PaymentType TEXT CHECK(PaymentType IN ('cash', 'card')) NOT NULL,
  FOREIGN KEY (SaleID) REFERENCES Sales(SaleID)
);

CREATE TABLE IF NOT EXISTS Discounts (
  DiscountID VARCHAR NOT NULL UNIQUE PRIMARY KEY,
  ProductID VARCHAR NOT NULL,
  StartDateTime DATETIME NOT NULL,
  EndDateTime DATETIME NOT NULL,
  Amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);