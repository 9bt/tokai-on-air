package gapi

import (
	"context"
	"io/ioutil"
	"os"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/youtube/v3"
)

var s *youtube.Service

func new() (*youtube.Service, error) {
	ctx := context.Background()

	f, err := os.Open("./youtube-accessor.json")
	if err != nil {
		return &youtube.Service{}, err
	}
	defer f.Close()
	json, _ := ioutil.ReadAll(f)

	jwt, err := google.JWTConfigFromJSON(json, youtube.YoutubeReadonlyScope)
	if err != nil {
		return &youtube.Service{}, err
	}

	client := jwt.Client(ctx)
	service, err := youtube.New(client)
	if err != nil {
		return &youtube.Service{}, err
	}

	return service, nil
}

// GenYouTubeService generates a YouTube service.
func GenYouTubeService() (*youtube.Service, error) {
	if s == nil {
		service, err := new()
		if err != nil {
			return &youtube.Service{}, err
		}

		s = service
	}

	return s, nil
}
