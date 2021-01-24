import { Component, OnInit } from '@angular/core';
import * as User from '../../models/user';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  method:   string;
  settings: any;
  userForm: FormGroup;

  constructor() { 
    this.method = "createUser";
    this.userForm = User.setForm();
    this.settings = {}
  }

  ngOnInit() {
  }

}
