import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecruiterDashboardComponent} from "./recruiter-dashboard/recruiter-dashboard.component";


const routes: Routes = [
  {
    path: 'recruiter',
    component: RecruiterDashboardComponent,
    children: [
      // {
      //   path: '',
      //   component:JobShellComponent
      // },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecruiterRoutingModule {}
