import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import { Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DatePipe} from "@angular/common";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import FieldValue = firebase.firestore.FieldValue;
import {timestamp} from "rxjs/operators";


@Component({
  selector: 'app-job-poster',
  templateUrl: './job-poster.component.html',
  styleUrls: ['./job-poster.component.css']
})
export class JobPosterComponent implements OnInit {

  jobForm = this.fb.group({

    title: ['', [Validators.required],],
    company: ['', [Validators.required]],
    description: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    type: ['', [Validators.required]],

  }, );


  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private responsive: BreakpointObserver,
  ) {

  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {
      if (result.matches) {
        console.log("screens matches HandsetLandscape") }
    });
  }

  onClick() {
    this.sendJobInfoTodatabase(this.jobForm);
  }
  sendJobInfoTodatabase(form: FormGroup) {
    this.fs.collection('jobs').add({
      uid: '',
      title: form.get('title')?.value,
      company: form.get('company')?.value,
      description: form.get('description')?.value,
      salary: form.get('salary')?.value,
      type: form.get('type')?.value,
    })
      .then (
        jobNewRECORD => {
          this.fs.collection('jobs').doc(jobNewRECORD.id)
            .update(
              {
                uid: jobNewRECORD.id,
                creationdate: firebase.firestore.FieldValue.serverTimestamp()
              }
            );
        })


  }
}
