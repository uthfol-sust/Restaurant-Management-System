package cmd

import (
	"fmt"
	"net/http"
	"restaurant-system/pkg/config"
	"restaurant-system/pkg/connection"
	"restaurant-system/pkg/core"
	"restaurant-system/pkg/middleware"
	"restaurant-system/pkg/migrations"
	"restaurant-system/pkg/routers"

	"github.com/joho/godotenv"
)

func Serve() {
	godotenv.Load()
	config.SetConfig()

	db := connection.GetDB()
	migrations.Migrate(db)

	mux := http.NewServeMux()

	controllersRoute := core.InitAppControllers(db)
	
	mngr := &middleware.Manager{}
	mngr.Use(middleware.CorsMiddleware)

	routers.RootRoutes(mux, *controllersRoute , mngr)

	handler := mngr.MiddlewareChain(mux)

	fmt.Println("Server Running on Port 8080")
	http.ListenAndServe(":8080", handler)
}
