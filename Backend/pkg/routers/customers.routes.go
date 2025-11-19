package routers

import (
	"net/http"
	"restaurant-system/pkg/controllers"
	"restaurant-system/pkg/middleware"
)

func CustomerRoutes(router *http.ServeMux, controller controllers.CustomerController, manager *middleware.Manager) {

	router.Handle("POST /customers",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.CreateCustomer),
			
		))

	router.Handle("GET /customers",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.GetCustomers),
			middleware.AuthMiddleware,
		))

	router.Handle("GET /customers/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.GetCustomerByID),
			middleware.AuthMiddleware,
		))

	router.Handle("PUT /customers/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.UpdateCustomer),
			middleware.AuthMiddleware,
		))

	router.Handle("DELETE /customers/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.DeleteCustomer),
			middleware.AuthMiddleware,
		))
}
