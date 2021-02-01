import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ViewSettings} from '../../models/view';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss']
})
export class UserCollectionComponent implements OnInit {

  public settings:          ViewSettings[] = [];

  constructor(private api: ApiService) {
    this.api.getUsers()
    .subscribe( 
      (response: any) => {

        if(response.status === 200) {
          response.body.data.forEach(element => {
            this.settings.push({
              id:       element.id,
              type:     "collection",
              name:     "user" + element.id,
              title:    element.nickname,
              subTitle: element.name + ' ' +  element.surname,
              content:  element.email,
              view:      'admin/users/' + element.id,
              edit:     'admin/editUser/' + element.id,
              delete:   true
            })
          });
        }
        
      },
      (error:any) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );
  }

  deleteEventHander(id: number): void {
    this.api.deleteUser(id)
    .subscribe( 
      (response: any) => {
        if(response === 200) {
          let deletedIndex = this.settings.findIndex(item => item.id === id);
          if(deletedIndex > -1) this.settings.splice(deletedIndex,1)
        }  
      },
      (error:any) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );
  }

  ngOnInit() {}

}
