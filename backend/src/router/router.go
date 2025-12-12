package router

import (
	"github.com/gofiber/fiber/v2"
	"notes-backend/src/controller"
	"notes-backend/src/middleware"
)

func SetupRoutes(app *fiber.App) {

	app.Post("/auth/register", controller.Register)
	app.Post("/auth/login", controller.Login)

	app.Get("/notes", middleware.JWTMiddleware, controller.GetNotes)
	app.Get("/notes/:id", middleware.JWTMiddleware, controller.GetNotes)
	app.Post("/notes", middleware.JWTMiddleware, controller.CreateNote)
	app.Delete("/notes/:id", middleware.JWTMiddleware, controller.DeleteNote)
}
