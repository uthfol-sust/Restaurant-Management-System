package core

import (
	"database/sql"
	"restaurant-system/pkg/controllers"
	"restaurant-system/pkg/repositories"
	"restaurant-system/pkg/services"
)

type AppControllers struct {
	Users            controllers.UserController
	Products         controllers.ProductController
	Inventories      controllers.InventoryController
	InventoryProduct controllers.InventoryProductController
	Supplier         controllers.SupplierController
	Order            controllers.OrderController
	OrderDetails     controllers.OrderDetailController
	Purchase         controllers.PurchaseController
	Payment          controllers.PaymentController
	Customer         controllers.CustomerController
}

func InitAppControllers(db *sql.DB) *AppControllers {
	userRepo := repositories.NewUserRepository(db)
	productRepo := repositories.NewProductRepository(db)
	inventoryRepo := repositories.NewInventoryRepository(db)
	inventoryProductRepo := repositories.NewInventoryProductRepo(db)
	supplierRepo := repositories.NewSupplierRepository(db)
	orderRepo := repositories.NewOrderRepo(db)
	orderDetailsRepo := repositories.NewOrderDetailRepo(db)
	purchaseRepo := repositories.NewPurchaseRepo(db)
	paymentRepo := repositories.NewPaymentRepo(db)
	customerRepo := repositories.NewCustomerRepository(db)

	userService := services.NewUserService(userRepo)
	productService := services.NewProductService(productRepo)
	inventoryService := services.NewInventoryService(inventoryRepo)
	inventoryProductService := services.NewInventoryProductService(inventoryProductRepo)
	supplierService := services.NewSupplierService(supplierRepo)
	orderService := services.NewOrderService(orderRepo)
	orderDetailService := services.NewOrderDetailService(orderDetailsRepo)
	purchaseService := services.NewPurchaseService(purchaseRepo)
	paymentService := services.NewPaymentService(paymentRepo)
	customerService := services.NewCustomerService(customerRepo)

	return &AppControllers{
		Users:            controllers.NewUserController(userService),
		Products:         controllers.NewProductController(productService),
		Inventories:      controllers.NewInventoryController(inventoryService),
		InventoryProduct: controllers.NewInventoryProductController(inventoryProductService),
		Supplier:         controllers.NewSupplierController(supplierService),
		Order:            controllers.NewOrderController(orderService),
		OrderDetails:     controllers.NewOrderDetailController(orderDetailService),
		Purchase:         controllers.NewPurchaseController(purchaseService),
		Payment:          controllers.NewPaymentController(paymentService),
		Customer:        controllers.NewCustomerController(customerService),
	}
}
