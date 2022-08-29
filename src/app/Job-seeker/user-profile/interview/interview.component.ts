import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LovedModel} from "../../../_models/loved.model";
import {JobServiceService} from "../../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {ApplicationModel} from "../../../_models/application.model";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

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
  }

  getApplications() {
    this.jobService.InterviewJobs().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res)
      })
  }
}
