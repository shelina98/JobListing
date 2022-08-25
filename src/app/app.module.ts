import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoginAndSignupModule} from "./Auth/login-and-signup.module";
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {NgSelectModule} from "@ng-select/ng-select";
import { JobSeekerDashboardComponent } from './Job-seeker/job-seeker-dashboard/job-seeker-dashboard.component';
import { SeekerNavComponent } from './Job-seeker/seeker-nav/seeker-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {JobShellComponent} from "./Job-seeker/job-shell/job-shell.component";
import {MatTabsModule} from "@angular/material/tabs";
import {JobSeekerModule} from "./Job-seeker/jobSeeker.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    JobSeekerDashboardComponent,
    SeekerNavComponent,
    JobShellComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    LoginAndSignupModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    NgSelectModule,
    MatSelectModule,
    AppRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTabsModule,
    JobSeekerModule,
    MatProgressBarModule,
    MatDividerModule

  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
