package routers

import (
	"net/http"
	"restaurant-system/pkg/controllers"
	"restaurant-system/pkg/middleware"
)

func productRoutes(router *http.ServeMux, controller controllers.ProductController, manager *middleware.Manager) {

	router.Handle("POST /products",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.CreateProduct),
			middleware.AuthMiddleware,
		),
	)

	router.Handle("GET /products",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.GetAllProduct),
		),
	)


	router.Handle("GET /products/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.GetProductById),
		),
	)

	router.Handle("PUT /products/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.UpdateProduct),
			middleware.AuthMiddleware,
		),
	)

	router.Handle("PUT /products/upload/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.UploadProduct),
			middleware.AuthMiddleware,
		),
	)

	router.Handle("DELETE /products/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(controller.DeleteProduct),
			middleware.AuthMiddleware,
		),
	)
}
