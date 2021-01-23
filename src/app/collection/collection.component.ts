import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  public objects: any[];

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getUsers()
    .subscribe( 
      (response: any) => {
        if(response.status === 200) this.objects = response.body.data;
        console.log(response)
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
