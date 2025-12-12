package model

import (
	"time"

	"github.com/google/uuid"
)

type Note struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uuid.UUID `gorm:"type:uuid"`
	Title     string
	Content   string
	// ImageURL  string
	CreatedAt time.Time
}