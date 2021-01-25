import { Component, OnInit } from '@angular/core';
import {UserForm, buildForm} from '../../models/user';
import {FormGroup} from '@angular/forms';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  method:       string;
  settings:     any = {};
  userStore:    UserForm;
  form:         FormGroup;

  constructor() { 
    this.method = "createUser";
    this.userStore = buildForm();
    this.settings = this.userStore.settings;
    this.form = this.userStore.form;
    /*
    this.userForm = User.setForm();

    Object.keys(this.userForm.value).forEach(key => {
      this.settings[key] = { 
        name:     key,
        label:    key[0].toUpperCase() + key.slice(1), 
        hint:     key === 'nickname' ? true : false,
        maxChars: key === 'nickname' ? 10 : null,
        hinText:  ""
      }
    });
    */
   
  }

  ngOnInit() {
  }

}
