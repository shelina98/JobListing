import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule} from "@angular/material/core";
import { MatSelectModule} from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from "@angular/material/divider";
import {RecruiterNavComponent} from "./recruiter-nav/recruiter-nav.component";
import {RecruiterDashboardComponent} from "./recruiter-dashboard/recruiter-dashboard.component";
import {RecruiterRoutingModule} from "./recruiter-routing-module";
import { JobPosterComponent } from './job-poster/job-poster.component';
import {ChangeRootComponent} from "../_shared/change-root/change-root.component";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import {RecruiterShellComponent} from "./recruiter-shell/recruiter-shell.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { JobListComponent } from './cruds-jobs/job-list/job-list.component';
import {DeleteDialogComponent} from "./cruds-jobs/delete-dialog/delete-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {DetailsComponent} from "./cruds-jobs/details/details.component";
import {JobEditerComponent} from "./cruds-jobs/job-editer/job-editer.component";
import {RecruiterProfileComponent} from "./recruiter-profile/recruiter-profile.component";
import {ProfEditComponent} from "./recruiter-profile/prof-edit/prof-edit.component";
import { InterviewsComponent } from './recruiter-profile/interviews/interviews.component';

@NgModule({
  declarations: [ RecruiterProfileComponent,ProfEditComponent, RecruiterNavComponent,JobEditerComponent, DetailsComponent,DeleteDialogComponent, RecruiterDashboardComponent, JobPosterComponent,RecruiterShellComponent, JobListComponent, InterviewsComponent,
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
    MatDividerModule,
    RecruiterRoutingModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
  ],
  entryComponents:[ChangeRootComponent,DeleteDialogComponent,DetailsComponent],
  exports: [

  ],
})

export class RecruiterModule {
}
