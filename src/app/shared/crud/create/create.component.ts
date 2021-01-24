import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  formKeys: string[];
  @Input()  formSettings: any;
  @Input()  createForm: FormControl;
  @Input()  method: string;
  

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.formKeys = Object.keys(this.createForm.value);
  }

  onSubmit() {
    this.api[this.method](this.createForm.value)
    .subscribe( 
      (response: any) => {
        if(response.status === 200) {
          
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
