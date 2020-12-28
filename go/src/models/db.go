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
/*
type DBManager interface {
    CreateTable(tableName string) (string,error)
}

func CreateTable(tableName string)(string, error) {
    return "ok", nil
}
*/

type DataStore interface {
    GetUsers() ([]*InfoUser, error)
    GetUser(id uint) (*User, error)
    GetInfoUser(id uint) (*InfoUser, error)
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