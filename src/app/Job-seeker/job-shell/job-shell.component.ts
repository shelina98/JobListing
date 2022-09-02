import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { JobServiceService} from "../../_services/job-service.service";
import { Job} from "../../_models/job.model";
import { Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from "../../_services/users.service";

@Component({
  selector: 'app-job-shell',
  templateUrl: './job-shell.component.html',
  styleUrls: ['./job-shell.component.css']
})
export class JobShellComponent implements OnInit {
  filterJob!: FormGroup;
  jobs: Job[] = []
  jobsF:Job[] = []
  selectedJob!: Job
  location : string = ""
  check: boolean = true
  index!:string
  userid = false
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  isSmall:boolean = false

  constructor(private _formBuilder: FormBuilder,
              private jobService: JobServiceService,
              private router: Router,
              private au: AuthenticationService,
              private fs: AngularFirestore,
              private  us: UsersService) {

    this.jobService.getAllJobs().subscribe(
      res => {
        if(res.length != 0)
        {
          this.jobs = res
          this.jobsF = res
          this.selectedJob = res[0]
          this.index= this.selectedJob.uid
        }
      });

    this.au.isLoggedInOb().subscribe(
      res=>
      {
        this.userid = res.valueOf()
      }
    )
    this.filterJob = new FormGroup({
      searchQ: new FormControl(),
      location: new FormControl()
    });

    this.subscribeChanges();

    this.us.isSmall.pipe().subscribe(
      res=> this.isSmall = res
    )
  }

  ngOnInit(): void {

    this.filterJob.patchValue({searchQ: '', location: ''});
    localStorage.setItem('role', 'job-seeker')

  }
  subscribeChanges() {
    this.filterJob.valueChanges // subscribe to all changes
     .subscribe(ref => {
       const searchStr = ref.searchQ.toLowerCase();
       this.location = ref.location;
       this.applyFilter(searchStr)
     });
  }
  gotopostjobs(){
    this.router.navigate(['/recruiter'])
  }

  active(job:Job){
    this.selectedJob = job;
    this.index = this.selectedJob.uid
    if(this.isSmall) {
      this.router.navigate(['details',this.selectedJob.uid])
      localStorage.removeItem('JobID');
      localStorage.setItem('JobID', job.uid);
    }
  }

  applyFilter(filter: string) {
    let i  =  this.jobs.filter((job,index) => {
      return job.title.toLowerCase().includes(filter)
    })
    this.jobsF = i
    console.log(i)
  }

  filterlocation() {
    debugger
      this.jobService.filterlocation(this.location).subscribe(
        res => {
          if(res.length != 0)
          {
            this.jobs = res
            this.jobsF = res
            this.selectedJob = res[0]
            this.index= this.selectedJob.uid
          }
        })
    console.log(this.jobsF)

  }

}
