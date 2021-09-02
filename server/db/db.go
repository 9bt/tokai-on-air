package db

import (
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func new() *sqlx.DB {
	connectionName := os.Getenv("CLOUDSQL_CONNECTION_NAME")
	user := os.Getenv("CLOUDSQL_DB_USER")
	password := os.Getenv("CLOUDSQL_DB_PASSWORD")
	dbName := os.Getenv("CLOUDSQL_DB_NAME")
	socket := os.Getenv("CLOUDSQL_SOCKET_PREFIX")

	if socket == "" {
		socket = "/cloudsql"
	}

	dsn := fmt.Sprintf("%s:%s@unix(%s/%s)/%s", user, password, socket, connectionName, dbName)
	if connectionName == "" {
		dsn = "root@/tokai_on_air_dev"
	}

	conn, err := sqlx.Open("mysql", fmt.Sprintf("%s?parseTime=true", dsn))
	if err != nil {
		panic(err)
	}

	conn.SetConnMaxLifetime(time.Second * 1)
	conn.SetMaxOpenConns(20)

	return conn
}

// DB prepares a database connection
func DB() *sqlx.DB {
	if db == nil {
		db = new()
		return db
	}

	if err := db.Ping(); err != nil {
		return new()
	}

	return db
}
