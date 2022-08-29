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

  apply(uid:string,userid:string, jobid:string) {
    this.jobService.getApplicationInfo(userid, jobid).pipe(take(1))
      .subscribe((el: ApplicationModel[]) => {
          if (el.length != 0) {
            this.snack.open('You already applied for this job.', 'OK', {
              duration: 2000,
              panelClass: ['blue-snackbar', 'login-snackbar'],
            })
          } else {
            this.fs.collection('application').add({
              uidUser: userid,
              uidJob: jobid,
              uid: uid
            })
              .then(
                ref => {
                  this.snack.open('You have just applied for this job.', 'OK', {
                    duration: 2000,
                    panelClass: ['blue-snackbar', 'login-snackbar'],
                  })

                }
              )
          }
        }
      )
  }

  delete(uid:string) {
    this.fs.collection('loved').doc(uid).delete().then(
      ref => {
        this.snack.open('You have removed this job to favorites.', 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar', 'login-snackbar'],
        })
      }
    )
  }

}
