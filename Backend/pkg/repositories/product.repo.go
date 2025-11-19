package repositories

import (
	"database/sql"
	"errors"
	"restaurant-system/pkg/models"
)

type ProductRepository interface {
	CreateProduct(product *models.Product) (*models.Product, error)
	GetAllProduct() ([]models.Product, error)
	GetProductById(id int) (*models.Product, error)
	UpdateProduct(id int, product *models.Product) (*models.Product, error)
	UpdateProductImage(id int, imageURL string) error
	DeleteProduct(id int) error
}

type productRepository struct {
	db *sql.DB
}

func NewProductRepository(db *sql.DB) *productRepository {
	return &productRepository{db: db}
}

func (p *productRepository) CreateProduct(product *models.Product) (*models.Product, error) {

	query := `INSERT INTO products (product_id, product_name, category, price)
		VALUES (? ,?, ?, ?)`

	result, err := p.db.Exec(query, product.ProductID, product.ProductName, product.Category, product.Price)

	if err != nil {
		return nil, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	product.ProductID = int(id)
	return product, nil
}

func (p *productRepository) GetAllProduct() ([]models.Product, error) {
	var products []models.Product

	query := `SELECT product_id, product_name, category, price, availability_status , IFNULL(image ,"")FROM products`

	rows, err := p.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		product := &models.Product{}

		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Category, &product.Price, &product.AvailabilityStatus,&product.Image)
		if err != nil {
			return nil, err
		}
		products = append(products, *product)
	}

	return products, nil
}

func (p *productRepository) GetProductById(id int) (*models.Product, error) {
	product := &models.Product{}

	query := `SELECT product_name, category, price, availability_status,IFNULL(image ,"") FROM products WHERE product_id=?`

	row := p.db.QueryRow(query, id)
	err := row.Scan(&product.ProductName, &product.Category, &product.Price, &product.AvailabilityStatus, &product.Image)

	if err == sql.ErrNoRows {
		return nil, errors.New("product not found")
	} else if err != nil {
		return nil, err
	}

	return product , nil
}

func (p *productRepository) UpdateProduct(id int ,product *models.Product) (*models.Product , error){
  query := `
		UPDATE products 
		SET product_name = ?, category = ?, price = ?, availability_status = ? 
		WHERE product_id = ?
	`
	_, err := p.db.Exec(query,
		product.ProductName,
		product.Category,
		product.Price,
		product.AvailabilityStatus,
		id,
	)

	if err != nil {
		return nil, err
	}
	product.ProductID = id

	return product, nil
}

func (r *productRepository) UpdateProductImage(id int, imageURL string) error {
	_, err := r.db.Exec("UPDATE products SET image=? WHERE product_id=?", imageURL, id)
	return err
}

func (p *productRepository) DeleteProduct(id int) error{
    query := `DELETE FROM products WHERE product_id = ?`
	result, err := p.db.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("no product found with given id")
	}

	return nil
}
