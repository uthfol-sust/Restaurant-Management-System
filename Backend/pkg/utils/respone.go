package utils

import (
	"encoding/json"
	"net/http"
)

func HTTPResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
        "success": true,
        "data":data,
	})
}
