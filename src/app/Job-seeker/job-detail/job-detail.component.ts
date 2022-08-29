import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JobServiceService} from "../../_services/job-service.service";
import {Job} from "../../_models/job.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnChanges {

  @Input() job: Job | undefined
  jobs!:Job
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  userid:boolean = false
  uid!:string
  constructor(private jobS: JobServiceService,
              private fs: AngularFirestore,
              private snackBar:MatSnackBar,
              private rt: Router) { }

  ngOnInit(): void {

    this.jobS.getAllJobs().subscribe(
      res=> {
       this.jobs = res[0]
      })
    if(JSON.stringify(localStorage.getItem('uid')) != null) {
      this.uid = JSON.stringify(localStorage.getItem('uid'))
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.jobs = changes.job.currentValue

    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  addtofav(jobs: Job) {
    console.log(this.uid)
      this.fs.collection('loved').add({
        uidUser: this.uid,
        uidJob:jobs.uid.toString()
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

  apply(jobs: Job) {
    console.log(this.uid)
    this.fs.collection('application').add({
      uidUser: this.uid,
      uidJob:jobs.uid.toString()
    }).then(
      application => {
        this.fs.collection('application').doc(application.id).update(
          {
            uid: application.id
          }
        );
        this.snackBar.open('You applied for this job.', 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar', 'login-snackbar'],
        })
      })

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
