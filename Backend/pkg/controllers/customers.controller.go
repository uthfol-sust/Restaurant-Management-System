package controllers

import (
	"encoding/json"
	"net/http"
	"restaurant-system/pkg/models"
	"restaurant-system/pkg/services"
	"restaurant-system/pkg/utils"
	"strconv"
)

type CustomerController interface {
	CreateCustomer(w http.ResponseWriter, r *http.Request)
	GetCustomers(w http.ResponseWriter, r *http.Request)
	GetCustomerByID(w http.ResponseWriter, r *http.Request)
	UpdateCustomer(w http.ResponseWriter, r *http.Request)
	DeleteCustomer(w http.ResponseWriter, r *http.Request)
}

type customerController struct {
	service services.CustomerService
}

func NewCustomerController(s services.CustomerService) CustomerController {
	return &customerController{service: s}
}

func (cc *customerController) CreateCustomer(w http.ResponseWriter, r *http.Request) {
	customer := &models.Customer{}
	utils.ParseBody(r, customer)

	created, err := cc.service.CreateCustomer(customer)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	utils.HTTPResponse(w, 201, created)
}

func (cc *customerController) GetCustomers(w http.ResponseWriter, r *http.Request) {
	customers, err := cc.service.GetCustomers()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(customers)
}

func (cc *customerController) GetCustomerByID(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	customer, err := cc.service.GetCustomerByID(id)
	if err != nil {
		http.Error(w, err.Error(), 404)
		return
	}

	json.NewEncoder(w).Encode(customer)
}

func (cc *customerController) UpdateCustomer(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	customer := &models.Customer{}
	utils.ParseBody(r, customer)

	updated, err := cc.service.UpdateCustomer(id, customer)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(updated)
}

func (cc *customerController) DeleteCustomer(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	err := cc.service.DeleteCustomer(id)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(204)
}
