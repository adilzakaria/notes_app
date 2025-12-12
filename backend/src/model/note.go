package model

import "time"

type Note struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint
	Title     string
	Content   string
	// ImageURL  string
	CreatedAt time.Time
}