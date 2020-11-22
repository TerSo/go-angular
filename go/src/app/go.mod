module app

go 1.15

replace app/settings => ../config

require (
	app/settings v0.0.0-00010101000000-000000000000
	github.com/julienschmidt/httprouter v1.3.0
	github.com/rs/cors v1.7.0
)
