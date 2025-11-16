package controllers

import (
	"encoding/json"
	"net/http"
	"restaurant-system/pkg/models"
	"restaurant-system/pkg/services"
	"restaurant-system/pkg/utils"

	"strconv"
)

type UserController interface {
	CreateUser(w http.ResponseWriter, r *http.Request)
	Login(w http.ResponseWriter, r *http.Request)
	GetAllUsers(w http.ResponseWriter, r *http.Request)
	UpdateUsers(w http.ResponseWriter, r *http.Request)
	DeleteUsers(w http.ResponseWriter, r *http.Request)

	GetUserById(w http.ResponseWriter, r *http.Request)
	GetUserByEmail(w http.ResponseWriter, r *http.Request)
}

type userController struct {
	userService services.UserServices
}

func NewUserController(userServices services.UserServices) *userController {
	return &userController{userService: userServices}
}

func (c *userController) CreateUser(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	createdUser, err := c.userService.Registration(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdUser)
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *userController) Login(w http.ResponseWriter, r *http.Request) {
	user := &LoginInput{}
	utils.ParseBody(r, user)

	isUser, err := c.userService.Login(user.Email, user.Password)
	if err != nil || isUser == nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	token, _ := utils.GenerateToken(isUser.ID, isUser.Name, isUser.Role)

	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteStrictMode,
		MaxAge:   30,
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	json.NewEncoder(w).Encode(map[string]interface{}{
	    "success": true,
		"message": "Login successful",
		"token":   token,
		"user": map[string]interface{}{
			"email": isUser.Email,
			"role":  isUser.Role,
		},
	})

}

func (c *userController) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	users, err := c.userService.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func (c *userController) UpdateUsers(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	ReqUser_id, _ := strconv.Atoi(idStr)

	user := &models.User{}
	utils.ParseBody(r, user)

	updated, err := c.userService.UpdateUser(ReqUser_id, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotModified)
		return
	}

	utils.HTTPResponse(w, 200, updated)
}

func (c *userController) DeleteUsers(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.PathValue("id"))

	err := c.userService.DeleteUser(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, 200, "Account Deleted Successfully")
}

func (c *userController) GetUserById(w http.ResponseWriter, r *http.Request) {
	userId, _ := strconv.Atoi(r.PathValue("id"))

	user, err := c.userService.GetUserById(userId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.HTTPResponse(w, 200, user)
}

func (c *userController) GetUserByEmail(w http.ResponseWriter, r *http.Request) {
	email := r.PathValue("email")

	user, err := c.userService.GetUserByEmail(email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	utils.HTTPResponse(w, 200, user)
}
