package controller

import (
	// "fmt"
	"notes-backend/src/config"
	"notes-backend/src/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// =========================
// HELPER: Ambil User ID dari JWT
// =========================
func GetUserID(c *fiber.Ctx) uint {
	user := c.Locals("user")
	if user == nil {
		return 0
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)

	idFloat := claims["user_id"].(float64)
	return uint(idFloat)
}

// =======================================
// CREATE NOTE
// =======================================
func CreateNote(c *fiber.Ctx) error {
	userID := GetUserID(c)

	title := c.FormValue("title")
	content := c.FormValue("content")

	// handle upload image (optional)
	// imageFile, err := c.FormFile("image")
	// var imageURL string

	// if err == nil && imageFile != nil {
	// 	path := fmt.Sprintf("./uploads/%s", imageFile.Filename)
	// 	if err := c.SaveFile(imageFile, path); err != nil {
	// 		return c.Status(500).JSON(fiber.Map{"message": "Failed to upload image"})
	// 	}
	// 	imageURL = "/uploads/" + imageFile.Filename
	// }

	if title == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Title is required"})
	}

	note := model.Note{
		UserID:   userID,
		Title:    title,
		Content:  content,
		// ImageURL: imageURL,
	}

	if err := config.DB.Create(&note).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to create note"})
	}

	return c.JSON(fiber.Map{
		"message": "Note created",
		"note":    note,
	})
}

// =======================================
// GET ALL NOTES FOR USER
// =======================================
func GetNotes(c *fiber.Ctx) error {
	userID := GetUserID(c)

	var notes []model.Note
	if err := config.DB.Where("user_id = ?", userID).Order("id DESC").Find(&notes).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to get notes"})
	}

	return c.JSON(notes)
}

// =======================================
// DELETE NOTE
// =======================================
func DeleteNote(c *fiber.Ctx) error {
	userID := GetUserID(c)
	id := c.Params("id")

	var note model.Note
	if err := config.DB.First(&note, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Note not found"})
	}

	// verify ownership
	if note.UserID != userID {
		return c.Status(403).JSON(fiber.Map{"message": "Not authorized"})
	}

	if err := config.DB.Delete(&note).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to delete"})
	}

	return c.JSON(fiber.Map{"message": "Note deleted"})
}
