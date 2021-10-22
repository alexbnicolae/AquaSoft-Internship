import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from  '@angular/common/http'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpListComponent } from './employer/emp-list/emp-list.component';
import { HeaderComponent } from './header/header.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { EmpPostComponent } from './employer/emp-post/emp-post.component';
import { ProjListComponent } from './project/project-list/project-list.component';
import { ProjPostComponent } from './project/project-post/project-post.component';
import { EmpPost2Component } from './employer/emp-post/emp-post2.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/singup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from 'src/error-interceptor';
import { ErrorComponent } from './error/error.component';

import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    HeaderComponent,
    FirstPageComponent,
    EmpPostComponent,
    ProjListComponent,
    ProjPostComponent, 
    EmpPost2Component, 
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
  
})
export class AppModule { }
