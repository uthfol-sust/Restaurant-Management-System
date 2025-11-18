package models

type User struct {
    ID        int    `json:"id"`                        
    Name      string `json:"name"`                       
    Password  string `json:"password"`                   
    Email     string `json:"email"`                      
    PhoneNo   string `json:"phone_no"`                  
    Role      string `json:"role"`                       
    ShiftTime string `json:"shift_time"` 
    Profile_image string  `json:"profile_image"`
    JoinAt    string `json:"join_at"`                  
    UpdatedAt string `json:"updated_at"`                 
}