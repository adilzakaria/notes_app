package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Logs struct {
	ID             uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	DateTime       time.Time `gorm:"not null" json:"date_time"`
	Method         string    `gorm:"size:10;not null" json:"method"`
	Endpoint       string    `gorm:"size:255;not null" json:"endpoint"`
	RequestHeaders string    `gorm:"type:text" json:"request_headers"` // JSON string, Authorization akan di-mask
	Payload        string    `gorm:"type:text" json:"payload"`         // Request body
	ResponseBody   string    `gorm:"type:text" json:"response_body"`
	StatusCode     int       `gorm:"not null" json:"status_code"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func (l *Logs) BeforeCreate(tx *gorm.DB) error {
	if l.ID == uuid.Nil {
		l.ID = uuid.New()
	}
	return nil
}