import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreUserComponent } from './store-user/store-user.component';
import {SharedModule} from '../shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';



@NgModule({
  declarations:[
    UserCollectionComponent, 
    StoreUserComponent, UserViewComponent, UserCollectionComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class AdminModule { }
