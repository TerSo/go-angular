import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormGroup} from '@angular/forms';
import {FormSettings} from '../../models/form';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
            storeForm:  FormGroup;
  @Input()  method:       string;
  @Input()  obj:          any;
  @Input()  id:           number;
  @Input()  formSettings: FormSettings[];
 
  constructor(private api: ApiService) {}

  private fillUserForm(obj: any) {
    this.formSettings.forEach(element => {
      element.form.setValue(obj[element.name]);
    });
  }

  ngOnInit() {
    let forms = {}
    this.formSettings.forEach((element: FormSettings) => {
      forms[element.name] = element.form
    });
    this.storeForm = new FormGroup(forms);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obj'].currentValue) {
        this.obj = changes['obj'].currentValue
        this.fillUserForm(this.obj);
    }
}

  onSubmit() {
    this.api[this.method](this.storeForm.value, this.id)
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
