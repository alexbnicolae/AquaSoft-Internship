import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/singup/signup.component';
import { EmpListComponent } from './employer/emp-list/emp-list.component';
import { EmpPostComponent } from './employer/emp-post/emp-post.component';
import { EmpPost2Component } from './employer/emp-post/emp-post2.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ProjListComponent } from './project/project-list/project-list.component';
import { ProjPostComponent } from './project/project-post/project-post.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent},
  { path: 'employees', component: EmpListComponent },
  { path: 'create-employees', component: EmpPostComponent, canActivate: [AuthGuard]},
  { path: 'projects', component: ProjListComponent },
  { path: 'create-projects', component: ProjPostComponent, canActivate: [AuthGuard]},
  { path: 'create-employees-with-proj', component: EmpPost2Component, canActivate: [AuthGuard]},
  { path: 'employees/edit/:empId', component: EmpPost2Component, canActivate: [AuthGuard]},
  { path: 'projects/edit/:projId', component: ProjPostComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
