
import { HttpInterceptor } from '@angular/common/http';
import {Validators, FormGroup, FormControl } from '@angular/forms';

interface InfoUser {
    id:         number
    nickName:   string
    name:       string
    surname: 	string
    email: 		string
}

interface User {
    id:         number
    Active:     boolean
    AuthType:   string
    info:       InfoUser
}

export function setForm(): FormGroup {
    return new FormGroup({
        nickname:   new FormControl('', Validators.required),
        email:      new FormControl('', Validators.required),
        name:       new FormControl('', Validators.required),
        surname:    new FormControl('', Validators.required)
    });
}

