import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Material modules */
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

/** Shared components */
import {StoreComponent} from './store/store.component';
import {ViewComponent} from './view/view.component';

@NgModule({
  declarations: [StoreComponent, ViewComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    StoreComponent,
    ViewComponent
  ]
})
export class SharedModule { }
