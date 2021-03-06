package db

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"os"
)

func ConnectDatabase() *sql.DB {
	database_url := os.Getenv("DATABASE_URL")
	database, err := sql.Open("postgres", database_url)
	if err != nil {
		log.Panic("cannot connect database. ", err)
	}
	return database
}
