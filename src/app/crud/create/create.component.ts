import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm = new FormGroup({
    nickname: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl('')
  });

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.createForm.value);
  }

}
