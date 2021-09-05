package mysql

import (
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/Masterminds/squirrel"

	"github.com/9bt/tokai-on-air/server/db"
	"github.com/9bt/tokai-on-air/server/flake"
	"github.com/9bt/tokai-on-air/server/model"
)

// ListVideos gets videos
func ListVideos(searchWord string, after, before time.Time, limit, offset uint64) ([]model.Video, error) {
	var videos []model.Video

	q := squirrel.Select("id", "name", "description", "youtube_id", "published_at").From("toa_video")
	if searchWord != "" {
		q = q.Where(squirrel.Like{"name": "%" + searchWord + "%"})
	}
	if !after.IsZero() {
		q = q.Where("published_at > ?", after)
	}
	if !before.IsZero() {
		q = q.Where("published_at < ?", before)
	}
	q = q.Limit(limit).Offset(offset).OrderBy("published_at ASC")

	sql, args, err := q.ToSql()
	if err != nil {
		return []model.Video{}, err
	}

	if err := db.DB().Select(&videos, sql, args...); err != nil {
		return []model.Video{}, err
	}

	return videos, nil
}

// FindVideo finds a video
func FindVideo(id int64) (model.Video, error) {
	var video model.Video

	cond := squirrel.Eq{"id": id}
	q := squirrel.Select("id", "name", "description", "youtube_id", "published_at").From("toa_video").Where(cond)

	sql, args, err := q.ToSql()
	if err != nil {
		return model.Video{}, err
	}

	if err := db.DB().Get(&video, sql, args...); err != nil {
		return model.Video{}, err
	}

	return video, nil
}

// ListYouTubeIds gets YouTube IDs of the video
func ListYouTubeIds() ([]string, error) {
	q := squirrel.Select("youtube_id").From("toa_video")
	sql, args, err := q.ToSql()
	if err != nil {
		return []string{}, err
	}

	yids := []string{}
	if err := db.DB().Select(&yids, sql, args...); err != nil {
		return []string{}, err
	}

	return yids, nil
}

// CreateVideo creates a video
func CreateVideo(video model.Video) (int64, error) {
	id, err := flake.GenerateNewID()
	if err != nil {
		return 0, err
	}
	video.Id = id

	q := `INSERT INTO toa_video (id, name, description, youtube_id, published_at) VALUES (:id, :name, :description, :youtube_id, :published_at)`
	if _, err := db.DB().NamedExec(q, video); err != nil {
		return 0, err
	}

	return id, nil
}

// UpdateVideo updates a video
func UpdateVideo(video model.Video) error {
	q := `UPDATE toa_video SET name = :name, description = :description, youtube_id = :youtube_id, published_at = :published_at, updated_at = NOW() WHERE youtube_id = :youtube_id`
	if _ , err := db.DB().NamedExec(q, video); err != nil {
		return err
	}

	return nil
}

// CreateOrUpdateVideo upserts a video
func CreateOrUpdateVideo(video model.Video) error {
	if _, err := CreateVideo(video); err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == duplicateErrorNumber {
			return UpdateVideo(video)
		}
	}

	return nil
}
