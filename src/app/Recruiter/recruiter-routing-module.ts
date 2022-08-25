import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecruiterDashboardComponent} from "./recruiter-dashboard/recruiter-dashboard.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {RecruiterShellComponent} from "./recruiter-shell/recruiter-shell.component";


const routes: Routes = [
  {
    path: 'recruiter',
    component: RecruiterDashboardComponent,
    children: [
      {
        path: '',
        component:RecruiterShellComponent
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecruiterRoutingModule {}
