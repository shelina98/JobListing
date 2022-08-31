import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {JobServiceService} from "../../_services/job-service.service";
import {ApplicationModel} from "../../_models/application.model";
import {Job} from "../../_models/job.model";

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  dataSource!: MatTableDataSource<Job>;
  displayedColumns: string[] = ['Title', 'Options'];

  constructor(private jobService: JobServiceService) {
    this.getApplications
  }
  ngOnInit(): void {
    this.getApplications()
  }


  getApplications() {
    this.jobService.RecruiterJobs().subscribe(
      res => {
         console.log(res)
      })
  }

}
