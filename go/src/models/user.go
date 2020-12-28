package models
//import "fmt"

type InfoUser struct {
    ID          uint
    NickName    string
    Name		string
    Surname 	string
    Email 		string
}

type User struct {
    MODEL
    InfoUser
    Active      bool
    AuthType    string
    Password  	string
}
   
func (db *DB) GetUsers() ([]*InfoUser, error) {
    users := db.Find(&User{})
    infoUsers := make([]*InfoUser, 0)
    row := users.Scan(&infoUsers)
    if row.Error != nil {
        return nil, row.Error
	}
    return infoUsers, nil
    /*
    rows, err := db.Select([]string{"id", "nick_name"}).Find(&[]User{}).Rows()
    defer rows.Close()
    
    users := make([]*InfoUser, 0)
    for rows.Next() {
        infoUser := new(InfoUser)
        err := rows.Scan(&infoUser.ID, &infoUser.NickName)
        if err != nil {
            return nil, err
        }
        users = append(users, infoUser)
    }
    
    return users, err
    */
}

func (db *DB) GetUser(id uint) (*User, error) {
    useRow := db.Where("id = ?", id).Find(&User{})
    user := new(User)
    row := useRow.Scan(&user)
    if row.Error != nil {
        return nil, row.Error
	}
    return user, nil
}

func (db *DB) GetInfoUser(id uint) (*InfoUser, error) {
    user := db.Where("id = ?", id).Find(&User{})
    infoUser := new(InfoUser)
    row := user.Scan(&infoUser)
    if row.Error != nil {
        return nil, row.Error
	}
    return infoUser, nil
}

func (db *DB) BuildUser(user *User) (bool) {
    newUser := db.NewRecord(user)
    return newUser
}

func (db *DB) CreateUser(user *User) (*User, error) {
    db.Create(&user)
    return user, nil
}