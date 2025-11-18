package routers

import (
	"net/http"
	"restaurant-system/pkg/controllers"
	"restaurant-system/pkg/middleware"
)

func usersRoutes(router *http.ServeMux, userController controllers.UserController, manager *middleware.Manager) {

	router.Handle("POST /register",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.CreateUser),
		))

	router.Handle("POST /login",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.Login),
		))

	router.Handle("GET /users",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.GetAllUsers),
		))

	router.Handle("GET /users/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.GetUserById),
			middleware.AuthMiddleware,
		))

	router.Handle("GET /users/email/{email}",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.GetUserByEmail),
			middleware.AuthMiddleware,
		))

	router.Handle("PUT /users/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.UpdateUsers),
			middleware.AuthMiddleware,
		))

	router.Handle("PUT /users/upload/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.UploadProfile),
			middleware.AuthMiddleware,
		),
	)

	router.Handle("DELETE /users/{id}",
		manager.MiddlewareChain(
			http.HandlerFunc(userController.DeleteUsers),
			middleware.AuthMiddleware,
		))
}
