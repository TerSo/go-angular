import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {CollectionComponent} from './collection/collection.component';
import {UserComponent} from './admin/user/user.component';
import {StoreUserComponent} from './admin/store-user/store-user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin',   redirectTo: '/admin/users', pathMatch: 'full' },
  { path: 'admin/users', component: CollectionComponent},
  { path: 'admin/users/:ID', component: UserComponent},
  { path: 'admin/newUser', component: StoreUserComponent},
  { path: 'admin/editUser', component: StoreUserComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
