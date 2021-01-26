import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {FormGroup} from '@angular/forms';
import {FormSettings} from '../../../models/form';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input()  formSettings: any;
  @Input()  method: string;
  createForm: FormGroup;
  

  constructor(private api: ApiService) {}

  ngOnInit() {
    let forms = {}
    this.formSettings.forEach((element: FormSettings) => {
      forms[element.name] = element.form
    });
    this.createForm = new FormGroup(forms);
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
