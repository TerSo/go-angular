package main

import (
	"config/settings"
	"models/main"
	"fmt"
	"log"
)
var env = "development"

type Env struct {
	db models.DataStore
}

func main() {
	envData := settings.GetEnvData(env)
	fmt.Printf("env: %+v\n", envData)
	
	dns := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=True&loc=Local", envData.Mysql.User, envData.Mysql.Password, envData.Mysql.Host, envData.Mysql.DB)
	db, errorDB := models.InitDB("mysql", dns)
	if errorDB != nil {
        log.Panic(errorDB)
	}

	db.AutoMigrate(&models.User{})
	env := &Env{db}

	user := models.User{NickName: "admin", Password: "admin", Active: true, AuthType: "1fa"}
	created, errCreated := env.db.CreateUser(&user)
	fmt.Println(created)
	fmt.Println(errCreated)
}
