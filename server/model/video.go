package model

import (
	"strconv"
	"time"

	"github.com/go-openapi/strfmt"
	"google.golang.org/api/youtube/v3"

	gm "github.com/9bt/tokai-on-air/server/generated/model"
)

// Video represents the video
type Video struct {
	Id          int64     `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
	YouTubeId   string    `db:"youtube_id" json:"youtube_id"`
	PublishedAt time.Time `db:"published_at" json:"published_at"`
	CreatedAt   time.Time `db:"created_at" json:"-"`
	UpdatedAt   time.Time `db:"updated_at" json:"-"`
}

const format = "2006-01-02T15:04:05Z"

// NewVideo returns a video from a YouTube search result
func NewVideo(item *youtube.SearchResult) Video {
	publishedAt, _ := time.Parse(format, item.Snippet.PublishedAt)

	return Video{
		YouTubeId:   item.Id.VideoId,
		Name:        item.Snippet.Title,
		Description: item.Snippet.Description,
		PublishedAt: publishedAt,
	}
}

//
func (v Video) APIModel() *gm.V1Video {
	return &gm.V1Video{
		ID:          strconv.FormatInt(v.Id, 10),
		Name:        v.Name,
		YoutubeID:   v.YouTubeId,
		PublishedAt: strfmt.DateTime(v.PublishedAt),
	}
}
