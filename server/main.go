package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/9bt/tokai-on-air/server/controller"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/videos", controller.ListVideos).Methods("GET")
	r.HandleFunc("/videos/{id}", controller.FindVideo).Methods("GET")
	r.HandleFunc("/videos/-/batch", controller.FetchAndSaveYouTubeVideos).Methods("PUT")

	r.HandleFunc("/videos/-/youtube", controller.ListYouTubeIds).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("CLIENT_BASE_URL")},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "2000"
	}

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("Failed to serve. err:", err)
	}
}
