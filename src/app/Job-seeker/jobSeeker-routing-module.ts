import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobSeekerDashboardComponent} from "./job-seeker-dashboard/job-seeker-dashboard.component";
import {JobShellComponent} from "./job-shell/job-shell.component";
import {JobSeekerGuard} from "../_guards/job-seeker.guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AuthenticationGuard} from "../_guards/authentication.guard";

const routes: Routes = [
  {
    path: '',
    component: JobSeekerDashboardComponent,
    children: [
      {
        path: '',
        component:JobShellComponent,
        canActivate: [JobSeekerGuard]
      },
      {
        path: 'profile',
        component:UserProfileComponent,
        canActivate: [AuthenticationGuard]
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class JobSeekerRoutingModule {}
