package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"notes-backend/src/utils"
)

func JWTMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")

	if authHeader == "" {
		return c.Status(401).JSON(fiber.Map{"message": "Missing Authorization header"})
	}

	// "Bearer token"
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(401).JSON(fiber.Map{"message": "Invalid Authorization format"})
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	// parse token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return utils.JWT_SECRET, nil
	})

	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"message": "Invalid or expired token"})
	}

	// simpan token ke context Fiber untuk controller yang butuh
	c.Locals("user", token)

	return c.Next()
}
