import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {MatTableDataSource} from "@angular/material/table";
import {Job} from "../../_models/job.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {JobServiceService} from "../../_services/job-service.service";

@Component({
  selector: 'app-recruiter-shell',
  templateUrl: './recruiter-shell.component.html',
  styleUrls: ['./recruiter-shell.component.css']
})
export class RecruiterShellComponent implements OnInit {
  whatWillShow!: boolean;
  height = 100;
  managerId = JSON.stringify(localStorage.getItem('uid'))

  dataSource = new MatTableDataSource<Job>() ;
  displayedColumns: string[] = ['Title',  'Description', 'Address','Options' ];

  @ViewChild(MatSort, {static:true}) sort!: MatSort ;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private authS: AuthenticationService,
              private jobService: JobServiceService) {
    localStorage.setItem('role','recruiter')
  }


   async getJobs() {

      this.jobService.getCertainsJobs(this.managerId).subscribe(
        res => {
          if(res.length != 0)
          {
            this.dataSource = new MatTableDataSource(res);
            console.log(this.dataSource)
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        });
  }


  async ngOnInit() {
    this.whatWillShow = (this.authS.isLoggedIn() && this.authS.isRecruiter())
    await this.getJobs()
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
