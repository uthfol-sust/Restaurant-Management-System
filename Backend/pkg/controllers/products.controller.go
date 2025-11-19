package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"restaurant-system/pkg/models"
	"restaurant-system/pkg/services"
	"restaurant-system/pkg/utils"
)

type ProductController interface {
	CreateProduct(w http.ResponseWriter, r *http.Request)
	GetAllProduct(w http.ResponseWriter, r *http.Request)
	GetProductById(w http.ResponseWriter, r *http.Request)
	UpdateProduct(w http.ResponseWriter, r *http.Request)
	UploadProduct(w http.ResponseWriter, r *http.Request)
	DeleteProduct(w http.ResponseWriter, r *http.Request)
}

type productController struct {
	productService services.ProductService
}

func NewProductController(productService services.ProductService) ProductController {
	return &productController{productService: productService}
}

func (c *productController) CreateProduct(w http.ResponseWriter, r *http.Request) {
	product := &models.Product{}

	utils.ParseBody(r, product)

	createdProduct, err := c.productService.CreateProduct(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"data":    createdProduct,
	})
}

func (c *productController) GetAllProduct(w http.ResponseWriter, r *http.Request) {
	products, err := c.productService.GetAllProduct()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, 200, products)
}

func (c *productController) GetProductById(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	product, err := c.productService.GetProductById(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	utils.HTTPResponse(w, 200, product)
}

func (c *productController) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	product := &models.Product{}
	utils.ParseBody(r, product)

	updatedProduct, err := c.productService.UpdateProduct(id, product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, 200, updatedProduct)
}

func (pc *productController) UploadProduct(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)

	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "No image found", http.StatusBadRequest)
		return
	}
	defer file.Close()

	Id := r.FormValue("product_id")

	url, err := pc.productService.UploadProduct(r.Context(), Id, file)
	if err != nil {
		log.Println("UploadProduct error:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, 200, url)
}

func (c *productController) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	err = c.productService.DeleteProduct(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, http.StatusNoContent, "Product Deleted")
}
