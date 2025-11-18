package migrations

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
)

func execMigration(db *sql.DB, name, query string) error {
	_, err := db.Exec(query)
	if err != nil {
		return fmt.Errorf("migration failed (%s): %w", name, err)
	}
	return nil
}

func Migrate(db *sql.DB) error {
	if db == nil {
		return errors.New("migrations: nil db provided")
	}

	migrations := []struct {
		name  string
		query string
	}{
		{ //1
			"users",
			`CREATE TABLE IF NOT EXISTS users (
				id INT PRIMARY KEY AUTO_INCREMENT,
				name VARCHAR(100),
				password VARCHAR(250),
				email VARCHAR(50),
				phone_no VARCHAR(15),
				role VARCHAR(20) DEFAULT 'Admin',
				shift_time VARCHAR(50),
				profile_image VARCHAR(255),
				join_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			);`,
		},
		{ // 2
			"products",
			`CREATE TABLE IF NOT EXISTS products(
				product_id INT PRIMARY KEY,
				product_name VARCHAR(100) NOT NULL,
				category VARCHAR(50) NOT NULL,
				price DECIMAL(10,2) NOT NULL,
				image VARCHAR(255),
				availability_status VARCHAR(30) DEFAULT 'Out of Stock'
			);`,
		},
		{ //3
			"inventory",
			`CREATE TABLE IF NOT EXISTS inventory (
				id INT PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				stock DECIMAL(10,2) NOT NULL,
				unit VARCHAR(20) NOT NULL,
				level DECIMAL(10,2) NOT NULL,
				image VARCHAR(255),
				last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			);`,
		},
		{//4
			"inventory-product",
			`CREATE TABLE IF NOT EXISTS inventory_product (
					product_id INT,
					id INT,
					quantity_required INT NOT NULL,
					FOREIGN KEY (product_id) REFERENCES products(product_id)
						ON UPDATE CASCADE
						ON DELETE CASCADE,
					FOREIGN KEY (id) REFERENCES inventory(id)
						ON UPDATE CASCADE
						ON DELETE CASCADE
				);`,
		},
		{//5
            "suppliers",
			`CREATE TABLE IF NOT EXISTS suppliers (
					supplier_id INT PRIMARY KEY,
					name VARCHAR(100) NOT NULL,
					contact_no VARCHAR(20),
					email VARCHAR(100),
					address TEXT
				);`,
		},

		{//6
			"purchases",
		    `CREATE TABLE IF NOT EXISTS purchases(
	           purchase_id INT PRIMARY KEY,
			   supplier_id INT,
			   inventory_id INT,
			   quantity_purchased float,
			   purchase_date DATE,
			   total_cost float,

			   FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
			   ON UPDATE CASCADE
			   ON DELETE SET NULL,
               FOREIGN KEY (inventory_id) REFERENCES inventory(id)
			   ON UPDATE CASCADE
			   ON DELETE SET NULL
               
			);`,
		},

		{ //7
			"orders",
			`CREATE TABLE IF NOT EXISTS orders (
				order_id INT PRIMARY KEY,
				waiter_id INT ,
				customer_id INT,
				order_time DATETIME ,
				status VARCHAR(20) ,
				total_amount DOUBLE ,

				FOREIGN KEY (waiter_id) REFERENCES users(id)
					ON UPDATE CASCADE
					ON DELETE SET NULL,

				FOREIGN KEY (customer_id) REFERENCES users(id)
					ON UPDATE CASCADE
					ON DELETE SET NULL
            );`,
		},
		{//8
			"orderDetails",
			`CREATE TABLE IF NOT EXISTS order_details (
					order_detail_id INT PRIMARY KEY,
					order_id INT NOT NULL,
					product_id INT NOT NULL,
					quantity INT,
					price DOUBLE,
					subtotal DOUBLE,

					FOREIGN KEY (order_id) REFERENCES orders(order_id)
						ON UPDATE CASCADE
						ON DELETE CASCADE,

					FOREIGN KEY (product_id) REFERENCES products(product_id)
						ON UPDATE CASCADE
						ON DELETE CASCADE
			 );`,
		},
        { //9
			"payments",
			`CREATE TABLE IF NOT EXISTS payments (
				payment_id INT PRIMARY KEY,
				order_id INT NOT NULL,
				payment_method VARCHAR(50) ,
				payment_status VARCHAR(50),
				amount_paid DOUBLE,
				payment_date DATETIME,

				FOREIGN KEY (order_id) REFERENCES orders(order_id)
					ON UPDATE CASCADE
					ON DELETE CASCADE
			);`,
		},
		{
			"customers",
			`CREATE TABLE IF NOT EXISTS customers (
				id INT PRIMARY KEY,
				name VARCHAR(100),
				phone VARCHAR(20),
				email VARCHAR(100),
				profile_image VARCHAR(255)
			);`,

		},

	}

	for _, m := range migrations {
		if err := execMigration(db, m.name, m.query); err != nil {
			return err
		}
	}

	log.Println("Database migration completed successfully!")
	return nil
}