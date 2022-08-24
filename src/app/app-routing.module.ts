import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Auth/login/login.component";
import {SignupComponent} from "./Auth/signup/signup.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {JobSeekerDashboardComponent} from "./Job-seeker/job-seeker-dashboard/job-seeker-dashboard.component";
import {JobShellComponent} from "./Job-seeker/job-shell/job-shell.component";

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'job-seeker', component: JobSeekerDashboardComponent,
    children: [
      { path:"",component: JobShellComponent}
    ]},
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})

export class AppRoutingModule {}
