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
	r.HandleFunc("/videos/-/latest", controller.ListLatestVideos).Methods("GET")
	r.HandleFunc("/videos/-/youtube", controller.ListYouTubeIds).Methods("GET")

	r.HandleFunc("/admin/video", controller.RenderAdminVideoPage).Methods("GET")
	r.HandleFunc("/admin/video", controller.UpdateVideoViaYouTube).Methods("POST")

	c := cors.New(cors.Options{
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization", "Content-Type", "X-Ms-Command-Name"},
		AllowedOrigins:   []string{os.Getenv("CLIENT_BASE_URL")},
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
