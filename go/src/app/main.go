package main

import (
	"encoding/json"
//	"fmt"
	"net/http"
//	"os"
	"log"
	"app/settings"
	"github.com/rs/cors"
	"github.com/julienschmidt/httprouter"
)

var env = "development"

func main() {
	// env_file, err := os.Open(path + "/.env")
	envData := settings.GetEnvData(env)

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
