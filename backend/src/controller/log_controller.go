package controller

import (
	"notes-backend/src/config"
	"notes-backend/src/model"

	"github.com/gofiber/fiber/v2"
)

// =======================================
// GET ALL LOGS (Optional - for debugging/admin)
// =======================================
func GetLogs(c *fiber.Ctx) error {
	// You can add admin check here
	// userID := GetUserID(c)
	// if !isAdmin(userID) { return 403 }

	var logs []model.Logs

	// Get query parameters for filtering
	limit := c.QueryInt("limit", 100) // Default 100 logs
	method := c.Query("method")       // Filter by method
	statusCode := c.QueryInt("status_code", 0)

	query := config.DB.Order("datetime DESC").Limit(limit)

	if method != "" {
		query = query.Where("method = ?", method)
	}

	if statusCode > 0 {
		query = query.Where("status_code = ?", statusCode)
	}

	if err := query.Find(&logs).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Failed to get logs",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Logs retrieved successfully",
		"total":   len(logs),
		"data":    logs,
	})
}