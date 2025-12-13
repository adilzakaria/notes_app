package controller

import (
	"notes-backend/src/config"
	"notes-backend/src/model"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// =========================
// HELPER: Ambil User ID dari JWT
// =========================
func GetUserID(c *fiber.Ctx) uuid.UUID {
	// Get user_id that was set by JWT middleware
	userID := c.Locals("user_id")
	if userID == nil {
		return uuid.Nil
	}

	idStr, ok := userID.(string)
	if !ok {
		return uuid.Nil
	}

	id, err := uuid.Parse(idStr)
	if err != nil {
		return uuid.Nil
	}

	return id
}

// =======================================
// CREATE NOTE
// =======================================
func CreateNote(c *fiber.Ctx) error {
	userID := GetUserID(c)
	if userID == uuid.Nil {
		return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
	}

	// Parse JSON body
	var req struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid JSON"})
	}

	if req.Title == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Title is required"})
	}

	note := model.Note{
		UserID:  userID,
		Title:   req.Title,
		Content: req.Content,
	}

	if err := config.DB.Create(&note).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to create note", "error": err.Error()})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "Note created successfully",
		"note":    note,
	})
}

// =======================================
// GET ALL NOTES FOR USER
// =======================================
func GetNotes(c *fiber.Ctx) error {
	userID := GetUserID(c)
	if userID == uuid.Nil {
		return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
	}

	var notes []model.Note
	if err := config.DB.Where("user_id = ?", userID).Order("id DESC").Find(&notes).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to get notes", "error": err.Error()})
	}

	return c.JSON(fiber.Map{
		"message": "Notes retrieved successfully",
		"data":    notes,
	})
}

func GetNoteByID(c *fiber.Ctx) error {
	userID := GetUserID(c)
	if userID == uuid.Nil {
		return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
	}

	noteID := c.Params("id")
	if noteID == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Note ID is required"})
	}

	var note model.Note
	if err := config.DB.First(&note, "id = ?", noteID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Note not found"})
	}

	// verify ownership
	if note.UserID != userID {
		return c.Status(403).JSON(fiber.Map{"message": "Not authorized to access this note"})
	}

	return c.JSON(fiber.Map{
		"message": "Note retrieved successfully",
		"data":    note,
	})
}

// =======================================
// DELETE NOTE
// =======================================
func DeleteNote(c *fiber.Ctx) error {
	userID := GetUserID(c)
	if userID == uuid.Nil {
		return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
	}

	id := c.Params("id")

	var note model.Note
	if err := config.DB.First(&note, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Note not found"})
	}

	// verify ownership
	if note.UserID != userID {
		return c.Status(403).JSON(fiber.Map{"message": "Not authorized to delete this note"})
	}

	if err := config.DB.Delete(&note).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to delete", "error": err.Error()})
	}

	return c.JSON(fiber.Map{
		"message": "Note deleted successfully",
	})
}
