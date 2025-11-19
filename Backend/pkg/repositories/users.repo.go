package repositories

import (
	"database/sql"
	"restaurant-system/pkg/models"
)

type UserRepository interface {
	GetAll() ([]models.User, error)
	GetByID(id int) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	Create(user *models.User) error
	Update(user *models.User) error
	UpdateProfileImage(userId, imageURL string) error
	Delete(id int) error
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *userRepository {
	return &userRepository{
		db: db,
	}
}

func (r *userRepository) GetAll() ([]models.User, error) {
	query := "SELECT id, name, email,IFNULL(role,''), IFNULL(phone_no,''), password FROM users"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.ID, &user.Name, &user.Email,&user.Role, &user.PhoneNo, &user.Password)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func (r *userRepository) GetByID(id int) (*models.User, error) {
	query := "SELECT id, name, email, password, role , IFNULL(phone_no, ''), IFNULL(profile_image,'') FROM users WHERE id = ?"
	user := &models.User{}
	err := r.db.QueryRow(query, id).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.Role, &user.PhoneNo, &user.Profile_image)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

func (r *userRepository) GetByEmail(email string) (*models.User, error) {
	query := "SELECT id, name, email, password , role, IFNULL(phone_no, '') FROM users WHERE email = ?"
	user := &models.User{}
	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.Role, &user.PhoneNo)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

func (r *userRepository) Create(user *models.User) error {
	query := "INSERT INTO users (name, email, password,role, phone_no, shift_time) VALUES (?, ?, ?,?,?,?)"
	result, err := r.db.Exec(query, user.Name, user.Email, user.Password, user.Role, user.PhoneNo, user.ShiftTime)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	user.ID = int(id)
	return nil
}

func (r *userRepository) Update(user *models.User) error {
	query := "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
	_, err := r.db.Exec(query, user.Name, user.Email, user.Password, user.ID)

	return err
}

func (r *userRepository) UpdateProfileImage(userId, imageURL string) error {
	_, err := r.db.Exec("UPDATE users SET profile_image=? WHERE id=?", imageURL, userId)
	return err
}

func (r *userRepository) Delete(id int) error {
	query := "DELETE FROM users WHERE id = ?"
	_, err := r.db.Exec(query, id)
	return err
}
