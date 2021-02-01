package models

type InfoUser struct {
    ID          uint    `json:"id"`
    NickName    string  `json:"nickname"`
    Name		string  `json:"name"`
    Surname 	string  `json:"surname"`
    Email 		string  `json:"email"`
}

type User struct {
    MODEL
    InfoUser
    Active      bool    `json:"active"`
    AuthType    string  `json:"authType"`
    Password  	string  `json:"password"`
}
   
func (db *DB) GetUsers() ([]*InfoUser, error) {
    
    users := db.Find(&[]User{})
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
func (db *DB) GetInfoUser(id uint64) (*InfoUser, error) {
    user := db.Where("id = ?", id).Find(&User{})
    infoUser := new(InfoUser)
    row := user.Scan(&infoUser)
    if row.Error != nil {
        return nil, row.Error
	}
    return infoUser, nil
}
func (db *DB) CreateUser(user *User) (*User, error) {
    created := db.Create(&user)
    if created.Error != nil {
        return nil, created.Error
	}
    return user, nil
}
func (db *DB) GetUser(id uint64) (*User, error) {
    useRow := db.Where("id = ?", id).Find(&User{})
    user := new(User)
    row := useRow.Scan(&user)
    if row.Error != nil {
        return nil, row.Error
	}
    return user, nil
}

func (db *DB) UpdateUser(user *User, id uint64) (*User, error) {
    oldUser := db.Where("id = ?", id).Find(&User{})
    updated := oldUser.Updates(&user)
   
    if updated.Error != nil {
        return nil, updated.Error
	}
    return user, nil
}

func (db *DB) DeleteUser(id uint64) (uint, error) {
    deleted := db.Delete(&User{}, id)
    if deleted.Error != nil {
        return 500, deleted.Error
	}
    return 200, nil
}

func (db *DB) BuildUser(user *User) (bool) {
    newUser := db.NewRecord(user)
    return newUser
}