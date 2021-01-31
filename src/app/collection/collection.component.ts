import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ViewSettings} from '../models/view';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  public objects: any[];
  public settings:          ViewSettings[] = [];

  constructor(private api: ApiService) {

    this.api.getUsers()
    .subscribe( 
      (response: any) => {
        console.log(response)
        response.body.data.forEach(element => {
          this.settings.push({
            type:     "collection",
            name:     "user" + element.id,
            title:    element.nickname,
            subTitle: element.name + ' ' +  element.surname,
            content:  element.email,
            edit:     'admin/editUser/' + element.id,
            delete:   true
          })
        });
        console.log(this.settings)
      },
      (error:any) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );

  }

  ngOnInit() {
    
  }

}
