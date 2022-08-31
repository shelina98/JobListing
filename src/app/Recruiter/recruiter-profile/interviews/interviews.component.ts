import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ApplicationModel} from "../../../_models/application.model";
import {JobServiceService} from "../../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  dataSource!: MatTableDataSource<ApplicationModel>;
  displayedColumns: string[] = ['Title', 'Options'];
  constructor(
    private jobService: JobServiceService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private fs: AngularFirestore
  ) {
    this.getApplications()
  }

  ngOnInit() {
    this.getApplications()
  }

  getApplications() {
    this.jobService.INTERVIEW().subscribe(
      res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
      })
  }

  withdrawal(uid:string) {
    this.fs.collection('application').doc(uid).delete().then(
      ref => {
        this.snack.open('Application seen.', 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar', 'login-snackbar'],
        })
      }
    )
  }

}
