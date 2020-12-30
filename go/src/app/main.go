package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"log"
	"strconv"
	"config/settings"
	"models/main"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter"
)

var env = "development"

type Home struct {
	Title    string
	SubTitle string
}

type UserRepository struct {
	db models.UserRepository
}

func main() {
	envData := settings.GetEnvData(env)
	
	// MySQL Connection
	dns := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=True&loc=Local", envData.Mysql.User, envData.Mysql.Password, envData.Mysql.Host, envData.Mysql.DB)
	db, errorDB := models.InitDB("mysql", dns)
	if errorDB != nil {
        log.Panic(errorDB)
	}

	// User Model
	userModel := &UserRepository{db}

	// set CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		   AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
	})

	// End points
	router := httprouter.New()
	router.GET("/", homeHandler)
	router.GET("/users/:id", userModel.User)
	router.GET("/info_users/:id", userModel.InfoUser)

	// Server
	log.Fatal(http.ListenAndServe(":"+ envData.Server.Port, c.Handler(router)))
}

/********* ACTIONS *********/
// Home page
func homeHandler(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	home := Home{"This message come from back-end Server", "Just a subtitle from back-end"}

	js, err := json.Marshal(home)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(js)
}
// GET /users/:id
func (model *UserRepository) User(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	id, errConversion := strconv.ParseUint(ps.ByName("id"), 0, 64)
	if errConversion != nil {
		http.Error(w, errConversion.Error(), http.StatusInternalServerError)
		return
	}

	user, errQuery := model.db.GetUser(id)
	if errQuery != nil {
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}
// GET /info_users/:id
func (model *UserRepository) InfoUser(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	id, errConversion := strconv.ParseUint(ps.ByName("id"), 0, 64)
	if errConversion != nil {
		http.Error(w, errConversion.Error(), http.StatusInternalServerError)
		return
	}

	user, errQuery := model.db.GetInfoUser(id)
	if errQuery != nil {
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}