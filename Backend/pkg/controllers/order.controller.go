package controllers

import (
	"fmt"
	"net/http"
	"restaurant-system/pkg/models"
	"restaurant-system/pkg/services"
	"restaurant-system/pkg/utils"
	"strconv"
)

type OrderController interface {
	CreateOrder(w http.ResponseWriter, r *http.Request)
	GetAllOrders(w http.ResponseWriter, r *http.Request)
	GetOrderByID(w http.ResponseWriter, r *http.Request)
	UpdateOrder(w http.ResponseWriter, r *http.Request)
	DeleteOrder(w http.ResponseWriter, r *http.Request)
}

type orderController struct {
	orderService services.OrderService
}

func NewOrderController(s services.OrderService) OrderController {
	return &orderController{orderService: s}
}

func (c *orderController) CreateOrder(w http.ResponseWriter, r *http.Request) {
	order := &models.Order{}
	utils.ParseBody(r, order)

	fmt.Println(order)

	createdOrder, err := c.orderService.CreateOrder(order)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	fmt.Println(createdOrder)

	utils.HTTPResponse(w, 201, createdOrder)
}

func (c *orderController) GetAllOrders(w http.ResponseWriter, r *http.Request) {
	orders, err := c.orderService.GetAllOrders()
	if err != nil {
		http.Error(w, "Failed to fetch orders: "+err.Error(), 500)
		return
	}

	utils.HTTPResponse(w, 200, orders)
}

func (c *orderController) GetOrderByID(w http.ResponseWriter, r *http.Request) {
	orderID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid order ID", http.StatusBadRequest)
		return
	}

	order, err := c.orderService.GetOrderByID(int64(orderID))
	if err != nil {
		http.Error(w, "Failed to fetch order: "+err.Error(), 404)
		return
	}

	utils.HTTPResponse(w, http.StatusOK, order)
}

func (c *orderController) UpdateOrder(w http.ResponseWriter, r *http.Request) {
	orderID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid order ID", http.StatusBadRequest)
		return
	}

	order := &models.Order{}
	utils.ParseBody(r, order)
	order.OrderID = int64(orderID)

	updatedOrder, err := c.orderService.UpdateOrder(order)
	if err != nil {
		http.Error(w, "Failed to update order: "+err.Error(), 500)
		return
	}

	utils.HTTPResponse(w, 200, updatedOrder)
}

func (c *orderController) DeleteOrder(w http.ResponseWriter, r *http.Request) {
	orderID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid order ID", http.StatusBadRequest)
		return
	}

	if err := c.orderService.DeleteOrder(int64(orderID)); err != nil {
		http.Error(w, "Failed to delete order: "+err.Error(), 500)
		return
	}

	utils.HTTPResponse(w, http.StatusNoContent, nil)
}
