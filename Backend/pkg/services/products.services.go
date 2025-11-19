package services

import (
	"context"
	"errors"
	"io"
	"restaurant-system/pkg/models"
	"restaurant-system/pkg/repositories"
	"restaurant-system/pkg/utils"
	"strconv"
)

type ProductService interface {
	CreateProduct(product *models.Product) (*models.Product, error)
	GetAllProduct() ([]models.Product, error)
	GetProductById(id int) (*models.Product, error)
	UpdateProduct(id int, product *models.Product) (*models.Product, error)
	UploadProduct(ctx context.Context, id string, file io.Reader) (string, error)
	DeleteProduct(id int) error
}

type productServices struct {
	productRepo repositories.ProductRepository
}

func NewProductService(productRepo repositories.ProductRepository) ProductService {
	return &productServices{productRepo: productRepo}
}

func (s *productServices) CreateProduct(product *models.Product) (*models.Product, error) {
	return s.productRepo.CreateProduct(product)
}

func (s *productServices) GetAllProduct() ([]models.Product, error) {
	return s.productRepo.GetAllProduct()
}

func (s *productServices) GetProductById(id int) (*models.Product, error) {
	return s.productRepo.GetProductById(id)
}

func (s *productServices) UpdateProduct(id int, product *models.Product) (*models.Product, error) {
	curProduct, err := s.productRepo.GetProductById(id)
	if err != nil {
		return nil, errors.New("product not found to updated")
	}

	if product.ProductName != "" {
		curProduct.ProductName = product.ProductName
	}
	if product.Category != "" {
		curProduct.Category = product.Category
	}
	if product.Price > 0.0 {
		curProduct.Price = product.Price
	}
	if product.AvailabilityStatus != "" {
		curProduct.AvailabilityStatus = product.AvailabilityStatus
	}

	return s.productRepo.UpdateProduct(id, curProduct)
}

func (s *productServices) UploadProduct(ctx context.Context, id string, file io.Reader) (string, error) {
	if id == "" {
		return "", errors.New("product_id is required")
	}

	uploadedURL, err := utils.UploadToCloudinary(ctx, file, "99meal/products")
	if err != nil {
		return "", err
	}

	idInt, err := strconv.Atoi(id)
	if err != nil {
		return "", errors.New("invalid product_id")
	}

	err = s.productRepo.UpdateProductImage(idInt, uploadedURL)
	if err != nil {
		return "", err
	}

	return uploadedURL, nil
}

func (s *productServices) DeleteProduct(id int) error {
	return s.productRepo.DeleteProduct(id)
}
