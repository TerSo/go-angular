import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {UserViewComponent} from './admin/user-view/user-view.component';
import {UserCollectionComponent} from './admin/user-collection/user-collection.component';
import {StoreUserComponent} from './admin/store-user/store-user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin',   redirectTo: '/admin/users', pathMatch: 'full' },
  { path: 'admin/users', component: UserCollectionComponent},
  { path: 'admin/users/:ID', component: UserViewComponent},
  { path: 'admin/newUser', component: StoreUserComponent},
  { path: 'admin/editUser/:ID', component: StoreUserComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
