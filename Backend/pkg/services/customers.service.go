package services

import (
	"restaurant-system/pkg/models"
	"restaurant-system/pkg/repositories"
)

type CustomerService interface {
	CreateCustomer(c *models.Customer) (*models.Customer, error)
	GetCustomers() ([]models.Customer, error)
	GetCustomerByID(id int) (*models.Customer, error)
	UpdateCustomer(id int, c *models.Customer) (*models.Customer, error)
	DeleteCustomer(id int) error
}

type customerService struct {
	repo repositories.CustomerRepository
}

func NewCustomerService(repo repositories.CustomerRepository) CustomerService {
	return &customerService{repo: repo}
}

func (s *customerService) CreateCustomer(c *models.Customer) (*models.Customer, error) {
	return s.repo.Create(c)
}

func (s *customerService) GetCustomers() ([]models.Customer, error) {
	return s.repo.GetAll()
}

func (s *customerService) GetCustomerByID(id int) (*models.Customer, error) {
	return s.repo.GetByID(id)
}

func (s *customerService) UpdateCustomer(id int, c *models.Customer) (*models.Customer, error) {
	return s.repo.Update(id, c)
}

func (s *customerService) DeleteCustomer(id int) error {
	return s.repo.Delete(id)
}
