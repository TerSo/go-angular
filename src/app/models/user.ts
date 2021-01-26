
import {Validators, FormControl } from '@angular/forms';
import {FormSettings} from './form';

export interface InfoUser {
    id:         number
    nickName:   string
    name:       string
    surname: 	string
    email: 		string
}

export interface User {
    id:         number
    Active:     boolean
    AuthType:   string
    info:       InfoUser
}

export function BuildUserForm(): FormSettings[] {
    return [
            {
                type:           'hintInput',
                name:           'nickname',
                label:          'Nickname',
                maxChars:       10,
                hintLabel:        'Max 10 charactesrs',
                placeHolder:    'Type a nickname',
                form:           new FormControl('', [Validators.required, Validators.maxLength(10)])
            },
            {
                type:           'simpleInput',
                name:           'name',
                label:          'Name',
                placeHolder:    'Type a name',
                form:           new FormControl('', Validators.required)
            },
            {
                type:           'simpleInput',
                name:           'surname',
                label:          'Surname',
                placeHolder:    'Type a surname',
                form:           new FormControl('', Validators.required)
            },
            {
                type:           'simpleInput',
                name:           'email',
                label:          'Email',
                placeHolder:    'Type an email address',
                form:           new FormControl('', Validators.required)
            }
        ];
    
}

