import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {LoginAndSignupModule} from "./Auth/login-and-signup.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    LoginAndSignupModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
