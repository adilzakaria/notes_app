package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"notes-backend/src/model"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Gagal konek ke database:", err)
	}

	// Assign DB global
	DB = db

	log.Println("✅ Berhasil konek ke database PostgreSQL")

	// Auto migrate semua model
	err = DB.AutoMigrate(
		&model.User{},
		&model.Note{},
	)
	if err != nil {
		log.Fatal("❌ Auto migrate gagal:", err)
	}

	log.Println("📦 Auto migration selesai")
}
