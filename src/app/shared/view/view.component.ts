import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() deleteEvent = new EventEmitter<number>();
  
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  navigateTo(path: string):void {
    this.router.navigateByUrl(path);
  }

  delete(id:number): void {
    this.deleteEvent.emit(id);
  }

}
