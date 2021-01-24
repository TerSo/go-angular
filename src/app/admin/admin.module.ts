import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { StoreUserComponent } from './store-user/store-user.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations:[
    UserComponent, 
    UsersComponent, 
    StoreUserComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class AdminModule { }
