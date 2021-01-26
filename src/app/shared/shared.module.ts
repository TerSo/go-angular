import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {StoreComponent} from './store/store.component';
import {ViewComponent} from './view/view.component';
import {CollectionComponent} from './collection/collection.component'

@NgModule({
  declarations: [StoreComponent, ViewComponent, CollectionComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    StoreComponent,
    ViewComponent,
    CollectionComponent
  ]
})
export class SharedModule { }
