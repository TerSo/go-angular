
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

interface UserFormStettings {
    type:           string
    name:           string
    label:          string
    maxChars?:      number
    hintLabel?:       string
    placeHolder?:   string
}

export interface UserForm {
    settings:   UserFormStettings[]
    form:       FormGroup
}

export function setForm(): FormGroup {
    return new FormGroup({
        nickname:   new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email:      new FormControl('', Validators.required),
        name:       new FormControl('', Validators.required),
        surname:    new FormControl('', Validators.required)
    });
}

export function buildForm(): UserForm {
    let form = new FormGroup({
        nickname:   new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email:      new FormControl('', Validators.required),
        name:       new FormControl('', Validators.required),
        surname:    new FormControl('', Validators.required)
    });
    return {
        settings:   [
            {
                type:           'hintInput',
                name:           'nickname',
                label:          'Nickname',
                maxChars:       10,
                hintLabel:        'Max 10 charactesrs',
                placeHolder:    'Type a nickname'
            },
            {
                type:           'simpleInput',
                name:           'name',
                label:          'Name',
                placeHolder:    'Type a name'
            },
            {
                type:           'simpleInput',
                name:           'surname',
                label:          'Surname',
                placeHolder:    'Type a surname'
            },
            {
                type:           'simpleInput',
                name:           'email',
                label:          'Email',
                placeHolder:    'Type an email address'
            }
        ],
        form:       form
    }
}

