import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {JobServiceService} from "../../_services/job-service.service";
import  { Job} from "../../_models/job.model";

@Component({
  selector: 'app-job-shell',
  templateUrl: './job-shell.component.html',
  styleUrls: ['./job-shell.component.css']
})
export class JobShellComponent implements OnInit {

  filterJob!: FormGroup;
  searchQ: string = ""
  jobs: Job[] = []
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private _formBuilder: FormBuilder,
              private jobService: JobServiceService) {

    this.jobService.getAllJobs().subscribe(
      res => {
        if(res.length != 0)
        {
          this.jobs = res
          console.log(this.jobs[0])
        }
        else {
          console.log('nuk ka pune')

        }
      });
  }

  ngOnInit(): void {

    this.filterJob = this._formBuilder.group({
      searchInput: "",
    })


  }



  // filterJobs(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //  // this.dataSource.filter = filterValue;
  // }

}
