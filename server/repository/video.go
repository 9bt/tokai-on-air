package repository

import (
	"time"

	"github.com/9bt/tokai-on-air/server/model"
	"github.com/9bt/tokai-on-air/server/repository/internal/mysql"
)

// ListVideos gets videos
func ListVideos(searchWord string, after, before time.Time, limit, offset uint64) ([]model.Video, error) {
	return mysql.ListVideos(searchWord, after, before, limit, offset)
}

// FindVideo finds a video
func FindVideo(id int64) (model.Video, error) {
	return mysql.FindVideo(id)
}

// ListYouTubeIds gets YouTube IDs of the video
func ListYouTubeIds() ([]string, error) {
	return mysql.ListYouTubeIds()
}

// CreateVideo creates a video
func CreateVideo(video model.Video) (int64, error) {
	return mysql.CreateVideo(video)
}
