import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {JobServiceService} from "../../_services/job-service.service";
import {ApplicationModel} from "../../_models/application.model";
import {Job} from "../../_models/job.model";
import {UsersService} from "../../_services/users.service";

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {
  isSmall:boolean = false
  constructor(private us:UsersService) {
  }
  ngOnInit(): void {
    this.us.isSmall.pipe().subscribe(
      res=> this.isSmall = res
    )
  }



}
