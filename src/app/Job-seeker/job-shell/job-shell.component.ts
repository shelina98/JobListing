import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobServiceService} from "../../_services/job-service.service";
import { Job} from "../../_models/job.model";
import { Router} from "@angular/router";

@Component({
  selector: 'app-job-shell',
  templateUrl: './job-shell.component.html',
  styleUrls: ['./job-shell.component.css']
})
export class JobShellComponent implements OnInit {

  filterJob!: FormGroup;
  searchQ: string = ""
  jobs: Job[] = []
  selectedJob!:Job
  index!:string
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  constructor(private _formBuilder: FormBuilder,
              private jobService: JobServiceService,
              private router: Router) {

    this.jobService.getAllJobs().subscribe(
      res => {
        if(res.length != 0)
        {
          console.log(res)
          this.jobs = res
          this.selectedJob = res[0]
          this.index= this.selectedJob.uid
        }
      });
  }

  ngOnInit(): void {
    this.filterJob = this._formBuilder.group({
      searchInput: "",
    })
    localStorage.setItem('role', 'job-seeker')
  }

  gotopostjobs(){
    this.router.navigate(['/recruiter'])
  }

  active(job:Job){
    this.selectedJob = job;
    this.index = this.selectedJob.uid
    console.log(this.selectedJob)
  }

  // filterJobs(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //  // this.dataSource.filter = filterValue;
  // }

}
