import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {JobServiceService} from "../../_services/job-service.service";
import {Job} from "../../_models/job.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {LovedModel} from "../../_models/loved.model";
import {ApplicationModel} from "../../_models/application.model";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnChanges {

  @Input() job: Job | undefined
  @Input() userid: boolean | undefined
  jobs!:Job
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  constructor(private jobS: JobServiceService,
              private fs: AngularFirestore,
              private snackBar:MatSnackBar,) { }

  ngOnInit(): void {
    this.jobS.getAllJobs().subscribe(
      res => {
        this.jobs = res[0]
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.jobs = changes.job.currentValue
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  addtofav(jobs: Job) {
    if(this.userid) {
      let usid = JSON.stringify(localStorage.getItem('uid'))
      this.jobS.getLOVEDInfo( usid , jobs.uid)
        .subscribe((el: LovedModel[]) => {
          if (el.length != 0) {
            this.snackBar.open('You have saved this job.', 'OK', {
              duration: 2000,
              panelClass: ['blue-snackbar', 'login-snackbar'],
            })
          }
          else {
            this.fs.collection('loved').add({
              uidUser: JSON.stringify(localStorage.getItem('uid')),
              uidJob: jobs.uid.toString()
            }).then(
              loveRec => {
                this.fs.collection('loved').doc(loveRec.id).update(
                  {
                    uid: loveRec.id
                  }
                );
                this.snackBar.open('Job added to favorites.', 'OK', {
                  duration: 2000,
                  panelClass: ['blue-snackbar', 'login-snackbar'],
                })
              })
          }
      })
    }
     else {
       this.addtofavN(jobs)
    }

  }

  apply(jobs: Job) {
    if(this.userid) {
      let usid = JSON.stringify(localStorage.getItem('uid'))
      this.jobS.getApplicationInfo( usid,jobs.uid)
        .subscribe((el: ApplicationModel[]) => {
          if (el.length != 0) {
            this.snackBar.open('You already applied for this job.', 'OK', {
              duration: 2000,
              panelClass: ['blue-snackbar', 'login-snackbar'],
            })
          }
          else {
            this.fs.collection('application').add({
              uidUser: JSON.stringify(localStorage.getItem('uid')),
              uidJob: jobs.uid.toString()
            }).then(
              appRec => {
                this.fs.collection('loved').doc(appRec.id).update(
                  {
                    uid: appRec.id
                  }
                );
                this.snackBar.open('You just applied for this job.', 'OK', {
                  duration: 2000,
                  panelClass: ['blue-snackbar', 'login-snackbar'],
                })
              })
          }
        })
    }
    else {
      this.applyN(jobs)
    }
  }

  addtofavN(jobs:Job){
    this.snackBar.open('You have to log in to add to favorites.', 'OK', {
      duration: 2000,
      panelClass: ['blue-snackbar', 'login-snackbar'],
    })
  }

  applyN(jobs:Job) {
    this.snackBar.open('You have to log in to add to apply.', 'OK', {
      duration: 2000,
      panelClass: ['blue-snackbar', 'login-snackbar'],
    })
  }

}
