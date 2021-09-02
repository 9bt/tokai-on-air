package service

import (
	"os"
	"time"

	"github.com/9bt/tokai-on-air/server/gapi"
	"github.com/9bt/tokai-on-air/server/model"
)

const format = "2006-01-02T15:04:05Z"

// FetchYouTubeVideos fetchs video metas via YouTube Data API
func FetchYouTubeVideos(after time.Time, before time.Time, maxCount int64) ([]model.Video, error) {
	videos := []model.Video{}

	youtube, err := gapi.GenYouTubeService()
	if err != nil {
		return videos, err
	}

	pageToken := ""
	parts := []string{"id", "snippet"}
	for {
		call := youtube.Search.
			List(parts).
			Type("video").
			Order("date").
			ChannelId(os.Getenv("YOUTUBE_CHANNEL_ID")).
			MaxResults(maxCount).
			PageToken(pageToken)

		if !after.IsZero() && !before.IsZero() {
			call = call.PublishedAfter(after.Format(format)).PublishedBefore(before.Format(format))
		}

		resp, err := call.Do()
		if err != nil {
			return videos, err
		}

		for _, item := range resp.Items {
			video := model.NewVideo(item)
			videos = append(videos, video)
		}

		pageToken = resp.NextPageToken
		if pageToken == "" {
			break
		}
	}

	return videos, nil
}
