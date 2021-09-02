package controller

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

// ParseAfterAndBeforeQueryParams returns after time and before time in query parameter
func ParseAfterAndBeforeQueryParams(r *http.Request) (time.Time, time.Time, error) {
	q := r.URL.Query()

	var after time.Time
	if q.Get("after") != "" {
		after, _ = time.Parse(dateTimeFormat, q.Get("after"))
	}

	var before time.Time
	if q.Get("before") != "" {
		before, _ = time.Parse(dateTimeFormat, q.Get("before"))
	}

	return after, before, nil
}

// ParseLimitOffsetQueryParams returns uint64 value of limit and offset in query parameter
func ParseLimitOffsetQueryParams(r *http.Request, maxLimit uint64) (uint64, uint64, error) {
	q := r.URL.Query()

	if q.Get("limit") == "" {
		return maxLimit, 0, nil
	}

	limit, err := strconv.ParseUint(q.Get("limit"), 10, 64)
	if err != nil {
		return 0, 0, err
	}

	if limit > maxLimit {
		return 0, 0, errors.New(fmt.Sprintf("The parameter 'limit' must be less than or equal to %d. limit: %d", maxLimit, limit))
	}

	if q.Get("offset") == "" {
		return limit, 0, nil
	}

	offset, err := strconv.ParseUint(q.Get("offset"), 10, 64)
	if err != nil {
		return 0, 0, err
	}

	return limit, offset, nil
}
