import {Component, Input, OnInit} from '@angular/core';
import {JobServiceService} from "../../_services/job-service.service";
import {Job} from "../../_models/job.model";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job: Job | undefined
  jobs!:Job
  constructor(private jobS: JobServiceService) { }

  ngOnInit(): void {

    // this.jobS.getCertainJob().subscribe(
    //   res=> {
    //     console.log(res)
    //   }

  }

}
