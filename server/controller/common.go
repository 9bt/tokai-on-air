package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// WriteJSONResponse writes a response as a json
func WriteJSONResponse(w http.ResponseWriter, v interface{}, status int) {
	resp, err := json.Marshal(v)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to marshal a json. err: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	w.Write(resp)
}

// WriteEmptyResponse writes an empty response
func WriteEmptyResponse(w http.ResponseWriter, status int) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	w.Write(nil)
}

// WriteCacheControlHeader writes a Cache-Control header
func WriteCacheControlHeader(w http.ResponseWriter, maxAge int) {
	w.Header().Set("Cache-Control", fmt.Sprintf("public, max-age=%d", maxAge))
}
