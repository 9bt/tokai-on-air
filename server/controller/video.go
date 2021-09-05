package controller

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"

	"github.com/9bt/tokai-on-air/server/model"
	"github.com/9bt/tokai-on-air/server/repository"
	"github.com/9bt/tokai-on-air/server/service"
	gm "github.com/9bt/tokai-on-air/server/generated/model"
)

const dateTimeFormat = "2006-01-02T15:04:05Z"

// ListVideos retrives represents REST API interface to retrieve videos
func ListVideos(w http.ResponseWriter, r *http.Request) {
	after, before, err := ParseAfterAndBeforeQueryParams(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	limit, offset, err := ParseLimitOffsetQueryParams(r, 50)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	videos, err := repository.ListVideos(r.URL.Query().Get("q"), after, before, limit, offset)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get YouTube videos. err: %v", err.Error()), http.StatusInternalServerError)
		return
	}

	resp := gm.V1ListVideosResponse{}
	for _, video := range videos {
		resp.Video = append(resp.Video, video.APIModel())
	}

	WriteCacheControlHeader(w)
	WriteJSONResponse(w, resp, http.StatusOK)
}

// FindVideo represents REST API interface to retrieve a video
func FindVideo(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to parse 'id'. err: %v", err.Error()), http.StatusBadRequest)
		return
	}

	video, err := repository.FindVideo(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to find YouTube video. err: %v", err.Error()), http.StatusInternalServerError)
		return
	}

	resp := gm.V1FindVideoResponse{
		Video: video.APIModel(),
	}

	WriteCacheControlHeader(w)
	WriteJSONResponse(w, resp, http.StatusOK)
}

// ListYouTubeIds represents REST API interface to retrieve YouTube IDs of the video
func ListYouTubeIds(w http.ResponseWriter, r *http.Request) {
	yids, err := repository.ListYouTubeIds()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get YouTube IDs. err: %v", err.Error()), http.StatusInternalServerError)
		return
	}

	resp := gm.V1ListVideoIdsResponse{
		ID: yids,
	}

	WriteCacheControlHeader(w)
	WriteJSONResponse(w, resp, http.StatusOK)
}

// FetchAndSaveYouTubeVideos represents REST API interface to fetch video metas via YouTube API and save them to database
func FetchAndSaveYouTubeVideos(w http.ResponseWriter, r *http.Request) {
	videos := []model.Video{}

	r.ParseForm()
	years := r.Form["year"]

	first := time.Date(2013, 10, 15, 0, 0, 0, 0, time.UTC)
	now := time.Now()
	for _, y := range years {
		year, err := strconv.Atoi(y)
		if err != nil {
			log.Printf("Skip because of failed to parse the year. err: %v", err.Error())
			continue
		}

		if year > now.Year() {
			log.Printf("Skip because of the year before this year. year: %d", year)
			continue
		}

		start := time.Date(year, 1, 1, 0, 0, 0, 0, time.UTC)
		if first.After(start) {
			start = first
		}

		end := time.Date(year, 12, 31, 23, 59, 59, 999999999, time.UTC)
		if now.Before(end) {
			end = now
		}

		for {
			vs, err := service.FetchYouTubeVideos(start, start.AddDate(0, 1, 0), 50)
			if err != nil {
				http.Error(w, fmt.Sprintf("Failed to search YouTube videos. err: %v", err.Error()), http.StatusInternalServerError)
				return
			}
			videos = append(videos, vs...)

			start = start.AddDate(0, 1, 0)
			if end.Before(start) {
				break
			}
		}
	}

	for _, video := range videos {
		if _, err := repository.CreateVideo(video); err != nil {
			http.Error(w, fmt.Sprintf("Failed to save YouTube video meta on firestore. err: %v", err.Error()), http.StatusInternalServerError)
			return
		}
	}

	WriteEmptyResponse(w, http.StatusOK)
}
