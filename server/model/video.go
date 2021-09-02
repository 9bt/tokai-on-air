package model

import (
	"time"

	"google.golang.org/api/youtube/v3"
)

// Video represents the video
type Video struct {
	ID          int64     `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
	YouTubeID   string    `db:"youtube_id" json:"youtube_id"`
	PublishedAt time.Time `db:"published_at" json:"published_at"`
	CreatedAt   time.Time `db:"created_at" json:"-"`
	UpdatedAt   time.Time `db:"updated_at" json:"-"`
}

const format = "2006-01-02T15:04:05Z"

// NewVideo returns a video from a YouTube search result
func NewVideo(item *youtube.SearchResult) Video {
	publishedAt, _ := time.Parse(format, item.Snippet.PublishedAt)

	return Video{
		YouTubeID:   item.Id.VideoId,
		Name:        item.Snippet.Title,
		Description: item.Snippet.Description,
		PublishedAt: publishedAt,
	}
}
