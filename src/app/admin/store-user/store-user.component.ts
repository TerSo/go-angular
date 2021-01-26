import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormSettings} from '../../models/form';
import {buildUserForm} from '../../models/user';


@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  method:   string;
  form:     FormGroup;
  settings: FormSettings[];

  constructor() { 
    this.method = "createUser";
    this.settings = buildUserForm();
  }

  ngOnInit() {
  }

}
