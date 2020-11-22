package settings

import (
	"encoding/json"
)

type Config struct {
	Server struct {
		Host string `json:"host"`
		Port string `json:"port"`
	} `json:"server"`
	Mysql struct {
		Host     string `json:"host"`
		User     string `json:"user"`
		Password string `json:"password"`
		DB       string `json:"db"`
	} `json:"mysql"`
}


func GetEnvData(s string) Config {
	var config Config
	var m map[string]Config
	m = make(map[string]Config)

	development := []byte(`{
        "server":{
            "host":"localhost",
            "port":"4201"},
        "mysql":{
            "host":"localhost",
            "user":"root",
            "password":""
		}
	}`)

	production := []byte(`{
        "server":{
            "host":"localhost",
            "port":"4201"},
        "mysql":{
            "host":"localhost",
            "user":"root",
            "password":""
		}
	}`)
	
	dev_err := json.Unmarshal(development, &config)
	if dev_err != nil {
		panic(dev_err)
	}
	m["development"] = config
	
	prod_err := json.Unmarshal(production, &config)
	if prod_err != nil {
		panic(prod_err)
	}
	m["production"] = config

	return m[s]
}
