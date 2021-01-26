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

type UserRepository interface {
    GetUsers() ([]*InfoUser, error)
    CreateUser(*User) (*User, error)
    GetUser(id uint64) (*User, error)
    UpdateUser(*User) (*User, error)
    DeleteUser(id uint64) (string, error)
    GetInfoUser(id uint64) (*InfoUser, error)
    BuildUser(*User) (bool)
    
}

func InitDB(dbName string, dataSourceName string) (*DB, error) {
    var err error
    db, err := gorm.Open(dbName, dataSourceName)
    if err != nil {
        return nil, err
    }
    return &DB{db}, nil
}