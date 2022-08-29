import { Component, OnInit} from '@angular/core';
import {JobServiceService} from "../../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {LovedModel} from "../../../_models/loved.model";
import {MatTableDataSource} from "@angular/material/table";
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

}
