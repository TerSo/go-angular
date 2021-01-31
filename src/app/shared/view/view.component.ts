import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ViewSettings} from '../../models/view';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Input()  id:           number;
  @Input()  method:       string;
  @Input()  model:        string;
  @Input()  view:          ViewSettings[];
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    
  }

  navigateTo(path: string):void {
    this.router.navigateByUrl(path);
  }

  delete(id:number): void {
    console.log(this.model)
    this.api['delete'+ this.model](id || this.id)
    .subscribe( 
      (response: any) => {
        if(response.status === 200) {
          console.log(response)
        }
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
