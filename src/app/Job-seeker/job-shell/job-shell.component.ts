import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-shell',
  templateUrl: './job-shell.component.html',
  styleUrls: ['./job-shell.component.css']
})
export class JobShellComponent implements OnInit {

  filterJob!: FormGroup;
  searchQ: string = ""

  constructor(private _formBuilder: FormBuilder) { }
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
