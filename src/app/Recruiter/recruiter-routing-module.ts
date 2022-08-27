import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecruiterDashboardComponent} from "./recruiter-dashboard/recruiter-dashboard.component";
import {RecruiterShellComponent} from "./recruiter-shell/recruiter-shell.component";
import {JobPosterComponent} from "./job-poster/job-poster.component";
import {RecruiterGuard} from "../_guards/recruiter.guard";
import {JobListComponent} from "./job-list/job-list.component";


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
        path:'job-poster',
        component: JobPosterComponent
      },
      {
        path:'job-list',
        component: JobListComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecruiterRoutingModule {}
