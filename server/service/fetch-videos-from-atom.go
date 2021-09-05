package service

import (
  "fmt"
  "os"

	"github.com/mmcdole/gofeed"

  "github.com/9bt/tokai-on-air/server/model"
)

// FetchVideosFromAtom fetchs video metas via YouTube Atom XML
func FetchVideosFromAtom() ([]model.Video, error) {
  url := fmt.Sprintf("https://www.youtube.com/feeds/videos.xml?channel_id=%s", os.Getenv("YOUTUBE_CHANNEL_ID"))

  f, err := gofeed.NewParser().ParseURL(url)
  if err != nil {
    return []model.Video{}, err
  }

  videos := []model.Video{}
  for _, item := range f.Items {
    if item == nil {
      break
    }

    video := model.Video{
      Name:        item.Title,
      Description: item.Extensions["media"]["group"][0].Children["description"][0].Value,
      YouTubeId:   item.Extensions["yt"]["videoId"][0].Value,
      PublishedAt: *item.PublishedParsed,
    }
    videos = append(videos, video)
  }

  return videos, nil
}
