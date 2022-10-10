import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsListComponent} from "./features/accounts-management/views/accounts-list/accounts-list.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {CustomersListComponent} from "./features/customers-management/views/customers-list/customers-list.component";
import {AppAuthGuard} from "./core/auth/guards/app.auth.guard";
import {PermissionDeniedComponent} from "./views/permission-denied/permission-denied.component";

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AppAuthGuard]},
  {path: "customers", component: CustomersListComponent, canActivate: [AppAuthGuard], data: {roles: ['ADMIN_USER']}},
  {path: "accounts", component: AccountsListComponent},
  {path: "permission-denied", component: PermissionDeniedComponent},

  {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
  // {path: "customers", component : CustomersComponent},
  // {path: "customers", component : CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
