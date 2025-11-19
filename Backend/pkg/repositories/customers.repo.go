package repositories

import (
	"database/sql"
	"errors"
	"restaurant-system/pkg/models"
)

type CustomerRepository interface {
	Create(customer *models.Customer) (*models.Customer, error)
	GetAll() ([]models.Customer, error)
	GetByID(id int) (*models.Customer, error)
	Update(id int, customer *models.Customer) (*models.Customer, error)
	Delete(id int) error
}

type customerRepository struct {
	db *sql.DB
}

func NewCustomerRepository(db *sql.DB) CustomerRepository {
	return &customerRepository{db: db}
}

func (r *customerRepository) Create(customer *models.Customer) (*models.Customer, error) {
	query := `INSERT INTO customers(name, phone, email)
			  VALUES ( ?, ?, ?)`

	_, err := r.db.Exec(query, customer.Name, customer.Phone, customer.Email)
	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (r *customerRepository) GetAll() ([]models.Customer, error) {
	query := `SELECT id, name, phone, email FROM customers`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	customers := []models.Customer{}

	for rows.Next() {
		var c models.Customer
		err := rows.Scan(&c.ID, &c.Name, &c.Phone, &c.Email)
		if err != nil {
			return nil, err
		}
		customers = append(customers, c)
	}

	return customers, nil
}

func (r *customerRepository) GetByID(id int) (*models.Customer, error) {
	query := `SELECT id, name, phone, email, profile_image FROM customers WHERE id = ?`
	row := r.db.QueryRow(query, id)

	var c models.Customer
	err := row.Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.ProfileImage)
	if err == sql.ErrNoRows {
		return nil, errors.New("customer not found")
	}
	if err != nil {
		return nil, err
	}

	return &c, nil
}

func (r *customerRepository) Update(id int, customer *models.Customer) (*models.Customer, error) {
	query := `UPDATE customers SET name=?, phone=?, email=?, profile_image=? WHERE id=?`

	_, err := r.db.Exec(query,
		customer.Name, customer.Phone, customer.Email, customer.ProfileImage, id,
	)
	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (r *customerRepository) Delete(id int) error {
	query := `DELETE FROM customers WHERE id=?`
	_, err := r.db.Exec(query, id)
	return err
}
