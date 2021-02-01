import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormSettings } from '../../models/form';
import { BuildUserForm, InfoUser, User } from '../../models/user';
import {ApiService} from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  id:       number;
  user:     InfoUser;
  method:   string;
  form:     FormGroup;
  settings: FormSettings[];

  constructor( private api: ApiService, private route: ActivatedRoute, private router: Router) { 
    this.id = Number(this.route.snapshot.paramMap.get('ID'));
    this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
    this.settings = BuildUserForm();

    if(this.id > 0) {
      this.method = "updateUser";
      if(!this.user) {
        this.api.getUser(this.id)
        .subscribe( 
          (response: any) => {
            this.user = response.body;
          },
          (error:any) => {
            console.log(error);
          },
          () => {
            console.log("completed");
          }
        );
      } 
    } else {
      this.method = "createUser";
    }
  }

  ngOnInit() {
   
  }

  storedUser(user: User) {
    console.log(user)
    this.router.navigateByUrl('/admin/users/' + user['ID']);
  }

}
