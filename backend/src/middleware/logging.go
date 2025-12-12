package middleware

import (
	"bytes"
	"encoding/json"
	"log"
	"strings"
	"time"

	"notes-backend/src/config"
	"notes-backend/src/model"

	"github.com/gofiber/fiber/v2"
)

// Response writer wrapper to capture response body
type responseWriter struct {
	fiber.Ctx
	body *bytes.Buffer
}

func LoggingMiddleware(c *fiber.Ctx) error {
	// Capture start time
	startTime := time.Now()

	// Read and store request body
	var requestBody []byte
	if c.Body() != nil {
		requestBody = c.Body()
	}

	// Mask Authorization header
	headers := make(map[string]string)
	c.Request().Header.VisitAll(func(key, value []byte) {
		keyStr := string(key)
		valueStr := string(value)

		// Mask Authorization header
		if strings.EqualFold(keyStr, "Authorization") {
			if strings.HasPrefix(valueStr, "Bearer ") {
				valueStr = "Bearer ***MASKED***"
			} else {
				valueStr = "***MASKED***"
			}
		}

		headers[keyStr] = valueStr
	})

	headersJSON, _ := json.Marshal(headers)

	// Continue to next handler
	err := c.Next()

	// After handler executes, capture response
	statusCode := c.Response().StatusCode()
	responseBody := c.Response().Body()

	// Limit response body size for logging (max 10KB)
	maxResponseSize := 10240
	responseBodyStr := string(responseBody)
	if len(responseBodyStr) > maxResponseSize {
		responseBodyStr = responseBodyStr[:maxResponseSize] + "...[truncated]"
	}

	// Create log entry
	logEntry := model.Logs{
		DateTime:       startTime,
		Method:         c.Method(),
		Endpoint:       c.Path(),
		RequestHeaders: string(headersJSON),
		Payload:        string(requestBody),
		ResponseBody:   responseBodyStr,
		StatusCode:     statusCode,
	}

	// Save to database (async to not block response)
	go func() {
		if err := config.DB.Create(&logEntry).Error; err != nil {
			log.Println("❌ Failed to save log:", err.Error())
		} else {
			log.Println("✅ Log saved:", logEntry.Method, logEntry.Endpoint, "Status:", logEntry.StatusCode)
		}
	}()

	return err
}