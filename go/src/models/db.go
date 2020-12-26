package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type DB struct {
    *gorm.DB
}

type MODEL struct {
	*gorm.Model
}

type DataStore interface {
    GetUsers() ([]*User, error)
    BuildUser(*User) (bool)
    CreateUser(*User) (*User, error)
}

func InitDB(dbName string, dataSourceName string) (*DB, error) {
    var err error
    db, err := gorm.Open(dbName, dataSourceName)
    if err != nil {
        return nil, err
    }
    return &DB{db}, nil
}