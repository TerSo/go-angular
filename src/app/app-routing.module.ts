import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {CollectionComponent} from './collection/collection.component';
import {UserComponent} from './users/user/user.component';
import {CreateComponent} from './crud/create/create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: CollectionComponent},
  { path: 'users/:ID', component: UserComponent},
  { path: 'createUser', component: CreateComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
 // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
