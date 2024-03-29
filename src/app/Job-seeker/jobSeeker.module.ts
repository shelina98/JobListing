import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JobDetailComponent } from './job-detail/job-detail.component';
import {JobSeekerRoutingModule} from "./jobSeeker-routing-module";
import {SeekerNavComponent} from "./seeker-nav/seeker-nav.component";
import {JobSeekerDashboardComponent} from "./job-seeker-dashboard/job-seeker-dashboard.component";
import {JobShellComponent} from "./job-shell/job-shell.component";
import {ChangeRootComponent} from "../_shared/change-root/change-root.component";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UsersService} from "../_services/users.service";
import { ProfileEditComponent } from './user-profile/profile-edit/profile-edit.component';
import { LovedComponent } from './user-profile/loved/loved.component';
import { InterviewComponent } from './user-profile/interview/interview.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
     JobDetailComponent,
     SeekerNavComponent,
     JobSeekerDashboardComponent,
     JobShellComponent,
     UserProfileComponent,
     ProfileEditComponent,
     LovedComponent,
     InterviewComponent,
  ],

  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    JobSeekerRoutingModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,


  ],

     providers:[UsersService],
    entryComponents:[ChangeRootComponent],
    exports: [
        JobDetailComponent,
        JobSeekerDashboardComponent,
        JobShellComponent,
        SeekerNavComponent
    ],
})

export class JobSeekerModule {
}
