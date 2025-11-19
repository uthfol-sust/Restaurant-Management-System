package models

type Customer struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Phone        string `json:"phone"`
	Email        string `json:"email"`
	ProfileImage string `json:"profile_image"`
}
