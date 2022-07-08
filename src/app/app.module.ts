import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserRequestFormComponent } from './user-request-form/user-request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenAccountComponent } from './open-account/open-account.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AccountHoldersComponent } from './account-holders/account-holders.component';
import { AccountRequestsComponent } from './account-requests/account-requests.component';
import { NotificationPortalComponent } from './notification-portal/notification-portal.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRequestFormComponent,
    OpenAccountComponent,
    AdminDashboardComponent,
    AccountHoldersComponent,
    AccountRequestsComponent,
    NotificationPortalComponent,
    ConfirmationPageComponent,
    ValidationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
