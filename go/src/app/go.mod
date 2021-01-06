module app

go 1.15

replace config/settings => ../config

replace models/main => ../models

replace logger => ../logger

require (
	config/settings v0.0.0-00010101000000-000000000000
	github.com/julienschmidt/httprouter v1.3.0
	github.com/rs/cors v1.7.0
	github.com/sirupsen/logrus v1.7.0 // indirect
	logger v0.0.0-00010101000000-000000000000
	models/main v0.0.0-00010101000000-000000000000
)
