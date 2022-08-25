import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobSeekerDashboardComponent} from "./job-seeker-dashboard/job-seeker-dashboard.component";
import {JobShellComponent} from "./job-shell/job-shell.component";

const routes: Routes = [
  {
    path: '',
    component: JobSeekerDashboardComponent,
    children: [
      {
        path: '',
        component:JobShellComponent
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class JobSeekerRoutingModule {}
