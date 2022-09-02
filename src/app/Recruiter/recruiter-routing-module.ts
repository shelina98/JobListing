import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecruiterDashboardComponent} from "./recruiter-dashboard/recruiter-dashboard.component";
import {RecruiterShellComponent} from "./recruiter-shell/recruiter-shell.component";
import {JobPosterComponent} from "./job-poster/job-poster.component";
import {RecruiterGuard} from "../_guards/recruiter.guard";
import {JobListComponent} from "./cruds-jobs/job-list/job-list.component";
import {AuthenticationGuard} from "../_guards/authentication.guard";
import {RecruiterProfileComponent} from "./recruiter-profile/recruiter-profile.component";
import {JobEditerComponent} from "./cruds-jobs/job-editer/job-editer.component";
const routes: Routes = [
  {
    path: 'recruiter',
    component: RecruiterDashboardComponent,
    children: [
      {
        path: '',
        component:RecruiterShellComponent,
        canActivate:[RecruiterGuard]

      },
      {
        path: 'profile-rec',
        component:RecruiterProfileComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'job-edit',
        component:JobEditerComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path:'job-poster',
        component:JobPosterComponent,
        canActivate: [AuthenticationGuard]
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecruiterRoutingModule {}
