import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHoldersComponent } from '../account-holders/account-holders.component';
import { AccountRequestsComponent } from '../account-requests/account-requests.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { ConfirmationPageComponent } from '../confirmation-page/confirmation-page.component';
import { NotificationPortalComponent } from '../notification-portal/notification-portal.component';
import { OpenAccountComponent } from '../open-account/open-account.component';
import { ValidationPageComponent } from '../validation-page/validation-page.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent,children:[
  {path:'dashboard',component:AdminDashboardComponent},
  {path:'open-account',component:OpenAccountComponent},
  {path:'account-holders',component:AccountHoldersComponent},
  {path:'account-requests',component:AccountRequestsComponent},
  {path:'notification-portal',component:NotificationPortalComponent},
  {path:'confirmation-page',component:ConfirmationPageComponent},
  {path:'validation',component:ValidationPageComponent},
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
