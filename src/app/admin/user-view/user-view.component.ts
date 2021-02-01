import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoUser } from '../../models/user';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  id:       number;
  user:     InfoUser;
  settings: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { 
    this.id = Number(this.route.snapshot.paramMap.get('ID'));
    this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
    if(this.id > 0) {
      if(!this.user) {
        this.api.getUser(this.id)
        .subscribe( 
          (response: any) => {
            this.user = response.body;
            this.settings = [{
              type:     "card",
              id:       this.user.id,
              title:    this.user.nickName,
              subTitle: this.user.name + ' ' +  this.user.surname,
              content:  this.user.email,
              edit:     'admin/editUser/' + this.user.id,
              delete:   true
            }]
          },
          (error:any) => {
            console.log(error);
          },
          () => {
            console.log("completed");
          }
        );
      } 
    } 
  }

  ngOnInit() {
  }

}
