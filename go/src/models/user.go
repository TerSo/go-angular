package models

type User struct {
	MODEL
    Name		string
    Surname 	string
    Email 		string
}

func (db *DB) GetUsers() ([]*User, error) {
	rows, err := db.Find(&[]User{}).Rows()
    defer rows.Close()

	users := make([]*User, 0)

	for rows.Next() {
		user := new(User)
        err := rows.Scan(&user.Name, &user.Surname, &user.Email)
        if err != nil {
            return nil, err
        }
        users = append(users, user)
	}
	
	if err = rows.Err(); err != nil {
        return nil, err
	}
    return users, err
}


func (db *DB) BuildUser(user *User) (bool) {
    newUser := db.NewRecord(user)
    return newUser
}

func (db *DB) CreateUser(user *User) (*User, error) {
    db.Create(&user)
    return user, nil
}