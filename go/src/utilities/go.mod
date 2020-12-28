module utilities

go 1.15

replace config/settings => ../config

replace models/main => ../models

require (
	config/settings v0.0.0-00010101000000-000000000000
	models/main v0.0.0-00010101000000-000000000000
)
