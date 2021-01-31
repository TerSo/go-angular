import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewSettings } from '../../models/view';
import { InfoUser } from '../../models/user';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  settings:     ViewSettings[];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('ID'))
    this.api.getUser(id)
    .subscribe( 
      (response: any) => {
        this.settings = [{
          type:     "card",
          name:     "user",
          title:    response.body.nickname,
          subTitle: response.body.name + ' ' +  response.body.surname,
          content:  response.body.email,
          edit:     'admin/editUser/' + id,
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
