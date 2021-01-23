import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string;
  subTitle: string;
  
  constructor(api: ApiService) {
    api.getHomeInfo()
    .subscribe( 
      (response: any) => {
        this.title = response.Title;
        this.subTitle = response.SubTitle;
      },
      (error:any) => {
        console.log(error);
      },
      () => {
        console.log("completed");
      }
    );
  }

  ngOnInit(): void {
  }

}
