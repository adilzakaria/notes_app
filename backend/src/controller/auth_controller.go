package controller

import (
	"notes-backend/src/config"
	"notes-backend/src/model"
	"notes-backend/src/utils"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type RegisterInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// =========================
// REGISTER
// =========================
func Register(c *fiber.Ctx) error {
	var input RegisterInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid request"})
	}

	// Validation simple
	if input.Name == "" || input.Email == "" || input.Password == "" {
		return c.Status(400).JSON(fiber.Map{"message": "All fields required"})
	}

	// Check existing user
	var existing model.User
	if err := config.DB.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"message": "Email already registered"})
	}

	// Hash password
	hash, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	user := model.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hash),
	}

	if err := config.DB.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Error creating user"})
	}

	return c.JSON(fiber.Map{
		"message": "Registration successful",
	})
}

// =========================
// LOGIN
// =========================
func Login(c *fiber.Ctx) error {
	var input LoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid request"})
	}

	var user model.User
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"message": "Invalid email or password"})
	}

	// Compare password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"message": "Invalid email or password"})
	}

	// Generate JWT
	token, err := utils.GenerateToken(user.ID.String())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to generate token"})
	}

	return c.JSON(fiber.Map{
		"message": "Login success",
		"token":   token,
		"user": fiber.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}
