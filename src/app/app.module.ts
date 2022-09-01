import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";

import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {LoginAndSignupModule} from "./Auth/login-and-signup.module";
import {RecruiterModule} from "./Recruiter/recruiter.module";
import {JobSeekerModule} from "./Job-seeker/jobSeeker.module";
import { ChangeRootComponent } from './_shared/change-root/change-root.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [ AppComponent, PageNotFoundComponent, ChangeRootComponent,],

    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        NgSelectModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        LoginAndSignupModule,
        RecruiterModule,
        JobSeekerModule,
        MatDialogModule,
        NgbModalModule

    ],
  exports:[
    CommonModule,
    FormsModule,
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
    MatToolbarModule,
    LayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
