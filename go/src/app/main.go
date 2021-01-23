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
	"logger"
)

var env = "development"
/*
type JsonResponse struct {
	// Reserved field to add some meta information to the API response
	Meta interface{} `json:"meta"`
	Data interface{} `json:"data"`
}
*/
/*
type JsonErrorResponse struct {
	Error *ApiError `json:"error"`
}

type ApiError struct {
	Status int16  `json:"status"`
	Title  string `json:"title"`
}
*/

type JsonResponse struct {
	Ok			bool	`json:"ok"`
	Status 		int16  	`json:"status"`
	StatusText	string	`json:"statusText"`
	Data interface{} `json:"data"`
}

type Home struct {
	Title    string
	SubTitle string
}

type UserRepository struct {
	db models.UserRepository
}

var standardLogger = logger.Init()

func main() {
	envData := settings.GetEnvData(env)

	// MySQL Connection
	dns := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=True&loc=Local", envData.Mysql.User, envData.Mysql.Password, envData.Mysql.Host, envData.Mysql.DB)
	db, errorDB := models.InitDB("mysql", dns)
	if errorDB != nil {
        log.Panic(errorDB)
	}

	// set CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		   AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
	})

	// User Model
	userModel := &UserRepository{db}

	// End points
	router := httprouter.New()
	router.GET("/", homeHandler)
	router.GET("/users", userModel.GetUsers)
	router.POST("/users", userModel.CreateUser)
	router.GET("/users/:id", userModel.GetUser)
//	router.PATCH("/users/:id", userModel.UpdateUser)
//	router.DELETE("/users/:id", userModel.DeleteUser)
	
	router.GET("/info_users/:id", userModel.InfoUser)

	// Server
	log.Fatal(http.ListenAndServe(":"+ envData.Server.Port, c.Handler(router)))
}

/*
// Writes the response as a standard JSON response with StatusOK
func writeOKResponse(w http.ResponseWriter, m interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(&JsonResponse{Data: m}); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, "Internal Server Error")
	}
}

// Writes the error response as a Standard API JSON response with a response code
func writeErrorResponse(w http.ResponseWriter, errorCode int, errorMsg string) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(errorCode)
	json.
		NewEncoder(w).
		Encode(&JsonErrorResponse{Error: &ApiError{Status: errorCode, Title: errorMsg}})
}
*/

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
// POST /users
func (model *UserRepository) CreateUser(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	var user = &models.User{}
	err := json.NewDecoder(req.Body).Decode(&user)
    if err != nil {
		standardLogger.ThrowError(http.StatusBadRequest, "CreateUser", err.Error())
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	createdUser, errQuery := model.db.CreateUser(user)
	if errQuery != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "CreateUser", errQuery.Error())
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(createdUser)
	if err != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "CreateUser", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}
// PATCH /users/:id
func (model *UserRepository) UpdateUser(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	user := &models.User{}
	user.NickName = "demo"
	user.Password = "demo"

	createdUser, errQuery := model.db.CreateUser(user)
	if errQuery != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "GetUser", errQuery.Error())
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(createdUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}
/*
// DELETE /users/:id
func (model *UserRepository) DeleteUser(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	id, errConversion := strconv.ParseUint(ps.ByName("id"), 0, 64)
	if errConversion != nil {
		http.Error(w, errConversion.Error(), http.StatusInternalServerError)
		return
	}

	deleted, errQuery := model.db.DeleteUser(id)
	if errQuery != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "DeleteUser", errQuery.Error())
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(deleted)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(response)
}
*/
// GET /users/:id
func (model *UserRepository) GetUser(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	id, errConversion := strconv.ParseUint(ps.ByName("id"), 0, 64)
	if errConversion != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "GetUser", errConversion.Error())
		http.Error(w, errConversion.Error(), http.StatusInternalServerError)
		return
	}

	user, errQuery := model.db.GetUser(id)
	if errQuery != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "GetUser", errQuery.Error())
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(user)
	if err != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "GetUser", err.Error())
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
// GET /users
func (model *UserRepository) GetUsers(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	users, errQuery := model.db.GetUsers()
	if errQuery != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "GetUsers", errQuery.Error())
		http.Error(w, errQuery.Error(), http.StatusInternalServerError)
		return
	}

	response := JsonResponse{Ok: true, Status: 200, StatusText: "got it", Data: users}
	
	if err := json.NewEncoder(w).Encode(response); err != nil {
		standardLogger.ThrowError(http.StatusInternalServerError, "Encoding response", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
}