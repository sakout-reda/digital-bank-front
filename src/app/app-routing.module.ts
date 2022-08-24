import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "./features/accounts-management/accounts.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {CustomersListComponent} from "./features/customers-management/views/customers-list/customers-list.component";

const routes: Routes = [
  {path: "", component : HomeComponent},
  {path: "customers", component : CustomersListComponent},
  {path: "accounts", component : AccountsComponent},
  {path: '**', pathMatch: 'full', component : PageNotFoundComponent},
  // {path: "customers", component : CustomersComponent},
  // {path: "customers", component : CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
