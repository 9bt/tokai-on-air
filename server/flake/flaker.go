package flake

import (
	"os"
	"time"

	"github.com/sony/sonyflake"
)

var sf *sonyflake.Sonyflake

func initSonyflake() {
	sf = sonyflake.NewSonyflake(sonyflake.Settings{
		StartTime: time.Unix(1527041400, 0), // 2018/05/23 02:20
		MachineID: func() (uint16, error) {
			return uint16(os.Getpid() % int(^uint16(0))), nil
		},
	})
}

func init() {
	initSonyflake()
}

// GenerateNewID generates universal unique identifer to use as primary key
func GenerateNewID() (int64, error) {
	if sf == nil {
		initSonyflake()
	}

	i, err := sf.NextID()

	return int64(i), err
}
