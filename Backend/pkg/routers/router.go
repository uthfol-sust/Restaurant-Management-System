package routers

import (
	"net/http"
	"restaurant-system/pkg/middleware"
	"restaurant-system/pkg/core"
)

func RootRoutes(router *http.ServeMux, controllers core.AppControllers, mngr *middleware.Manager) {

	usersRoutes(router, controllers.Users, mngr)

	productRoutes(router, controllers.Products, mngr)
	inventoryRoutes(router, controllers.Inventories, mngr)
	InventoryProductRoutes(router, controllers.InventoryProduct, mngr)

	SupplierRoutes(router, controllers.Supplier, mngr)

	OrderRoutes(router, controllers.Order, mngr)
	OrderDetailsRoutes(router, controllers.OrderDetails, mngr)
	
	PurchaseRoutes(router, controllers.Purchase, mngr)
	PaymentRoutes(router, controllers.Payment, mngr)

	CustomerRoutes(router, controllers.Customer , mngr)

}
