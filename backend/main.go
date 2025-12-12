package main

import (
	"log"
	"fmt"
	"os"

	"notes-backend/src/config"
	"notes-backend/src/router"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️  No .env file found, using environment variables")
	}

	// Connect ke database PostgreSQL
	fmt.Println("DB_HOST:", os.Getenv("DB_HOST"))
	fmt.Println("DB_USER:", os.Getenv("DB_USER"))
	fmt.Println("DB_PORT:", os.Getenv("DB_PORT"))
	config.ConnectDB()

	// Create fiber app
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	// Setup router
	router.SetupRoutes(app)

	// Base port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("🚀 Server berjalan di port", port)
	log.Fatal(app.Listen(":" + port))
}

