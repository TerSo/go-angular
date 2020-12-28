package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"log"
	"config/settings"
	"models/main"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter"
)

var env = "development"

type Env struct {
	db models.DataStore
}

func main() {
	envData := settings.GetEnvData(env)
	
	// Database stuff
	dns := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=True&loc=Local", envData.Mysql.User, envData.Mysql.Password, envData.Mysql.Host, envData.Mysql.DB)
	db, errorDB := models.InitDB("mysql", dns)
	if errorDB != nil {
        log.Panic(errorDB)
	}

	env := &Env{db}
	users, e := env.db.GetUsers()
	user, ee := env.db.GetUser(1)
	infoUser, eee := env.db.GetInfoUser(1)
	fmt.Printf("users: %+v %+v\n", users[0], e)
	fmt.Printf("infoUser: %+v %+v\n", infoUser, eee)
	fmt.Printf("user: %+v %+v\n", user, ee)

	// set CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		   AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
	})

	router := httprouter.New()
	router.GET("/", homeHandler)

	log.Fatal(http.ListenAndServe(":"+ envData.Server.Port, c.Handler(router)))
}



// Home page
type Home struct {
	Title    string
	SubTitle string
}


func homeHandler(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	home := Home{"This message come from back-end Server", "Just a subtitle from back-end"}

	js, err := json.Marshal(home)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(js)
}
