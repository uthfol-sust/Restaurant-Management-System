package models

import "time"

type Order struct {
	OrderID     int64   `json:"order_id"`     
	WaiterID    int     `json:"waiter_id"`    
	CustomerID  int     `json:"customer_id"`  
	OrderTime   time.Time  `json:"order_time"`
	 TableNo     int       `json:"table_no"`
	Status      string  `json:"status"`      
	TotalAmount float64 `json:"total_amount"` 
}
