import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./Auth/login/login.component";
import { SignupComponent } from "./Auth/signup/signup.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { JobSeekerRoutingModule } from "./Job-seeker/jobSeeker-routing-module";
import { RecruiterRoutingModule } from "./Recruiter/recruiter-routing-module";


const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            JobSeekerRoutingModule,
            RecruiterRoutingModule],
  exports: [RouterModule],
})

export class AppRoutingModule {}
