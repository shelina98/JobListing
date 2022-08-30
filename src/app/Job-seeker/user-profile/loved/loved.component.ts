import { Component, OnInit} from '@angular/core';
import {JobServiceService} from "../../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {LovedModel} from "../../../_models/loved.model";
import {MatTableDataSource} from "@angular/material/table";
import {DataSource} from "@angular/cdk/collections";
import {take} from "rxjs/operators";
import {ApplicationModel} from "../../../_models/application.model";
@Component({
  selector: 'app-loved',
  templateUrl: './loved.component.html',
  styleUrls: ['./loved.component.css']
})
export class LovedComponent implements OnInit {
  dataSource!: MatTableDataSource<LovedModel>;
  displayedColumns: string[] = ['Title', 'Options'];
  uidTodelete!: string;

  constructor(
    private jobService: JobServiceService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private fs: AngularFirestore
  ) {
    this.getLoves()
  }

  ngOnInit() {
  }

  getLoves() {
    this.jobService.LovedJobs().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res)
      })
  }

  delete(uid: string) {
    debugger
    this.fs.collection('loved').doc(uid).delete().then(
      ref => {
        this.snack.open('You have removed this job to favorites.', 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar', 'login-snackbar'],
        })
      }
    )
  }


  apply(uid: string, userid: string, jobid: string, jobtit: string) {
    let usid = localStorage.getItem('uid')
    this.delete(uid)
    this.fs.collection('application').add({
      uidUser: usid,
      uidJob: jobid,
      jobtit: jobtit
    }).then(
      appRec => {
        this.fs.collection('application').doc(appRec.id).update(
          {
            uid: appRec.id
          }
        );
      }).then(ref => {
      this.snack.open('You just applied for this job.', 'OK', {
        duration: 2000,
        panelClass: ['blue-snackbar', 'login-snackbar'],
      })
    })
  }

}
