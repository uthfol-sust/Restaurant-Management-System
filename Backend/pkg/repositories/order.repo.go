package repositories

import (
	"database/sql"
	"restaurant-system/pkg/models"
	"time"
)

type OrdersRepo interface {
	CreateOrder(order *models.Order) (*models.Order, error)
	GetAllOrders() ([]models.Order, error)
	GetOrderByID(id int64) (*models.Order, error)
	UpdateOrder(order *models.Order) (*models.Order, error)
	DeleteOrder(id int64) error
}

type orderRepo struct {
	db *sql.DB
}

func NewOrderRepo(db *sql.DB) OrdersRepo {
	return &orderRepo{db: db}
}

func (r *orderRepo) CreateOrder(order *models.Order) (*models.Order, error) {
    formattedTime := order.OrderTime.Format("2006-01-02 15:04:05")

    query := `
        INSERT INTO orders (waiter_id, customer_id, table_no, order_time, status, total_amount)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    res, err := r.db.Exec(query,
        order.WaiterID,
        order.CustomerID,
        order.TableNo,
        formattedTime,
        order.Status,
        order.TotalAmount,
    )
    if err != nil {
        return nil, err
    }

    id, _ := res.LastInsertId()
    order.OrderID = id

    return order, nil
}

func (r *orderRepo) GetAllOrders() ([]models.Order, error) {
	rows, err := r.db.Query(`SELECT order_id, waiter_id, customer_id, order_time, status, total_amount FROM orders`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []models.Order

	for rows.Next() {
		var o models.Order
		var orderTimeStr string

		if err := rows.Scan(&o.OrderID, &o.WaiterID, &o.CustomerID, &orderTimeStr, &o.Status, &o.TotalAmount); err != nil {
			return nil, err
		}

		parsedTime, err := time.Parse("2006-01-02 15:04:05", orderTimeStr)
		if err != nil {
			return nil, err
		}
		o.OrderTime = parsedTime
		orders = append(orders, o)
	}

	return orders, nil
}

func (r *orderRepo) GetOrderByID(id int64) (*models.Order, error) {
	row := r.db.QueryRow(`SELECT order_id, waiter_id, customer_id, order_time, status, total_amount
	                      FROM orders WHERE order_id=?`, id)

	var tempTime string
	o := &models.Order{}
	err := row.Scan(&o.OrderID, &o.WaiterID, &o.CustomerID, &tempTime, &o.Status, &o.TotalAmount)
	if err != nil {
		return nil, err
	}

	o.OrderTime, err = time.Parse("2006-01-02 15:04:05", tempTime)
	if err != nil {
		return nil, err
	}
	return o, nil
}

func (r *orderRepo) UpdateOrder(o *models.Order) (*models.Order, error) {
	query := `UPDATE orders SET waiter_id=?, customer_id=?, order_time=?, status=?, total_amount=? WHERE order_id=?`

	formattedTime := o.OrderTime.Format("2006-01-02 15:04:05")

	_, err := r.db.Exec(query, o.WaiterID, o.CustomerID, formattedTime, o.Status, o.TotalAmount, o.OrderID)
	if err != nil {
		return nil, err
	}
	return o, nil
}

func (r *orderRepo) DeleteOrder(id int64) error {
	_, err := r.db.Exec(`DELETE FROM orders WHERE order_id=?`, id)
	return err
}
