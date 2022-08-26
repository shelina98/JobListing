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


@NgModule({
  declarations: [ RecruiterNavComponent, RecruiterDashboardComponent, JobPosterComponent
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
    MatSnackBarModule
  ],
  entryComponents:[ChangeRootComponent],
  exports: [

  ],
})

export class RecruiterModule {
}
