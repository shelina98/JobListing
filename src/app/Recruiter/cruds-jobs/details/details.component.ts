import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Job} from "../../../_models/job.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
export interface DetailsData {
  job: Job;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = false;

  constructor( public dialogRef: MatDialogRef<DetailsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DetailsData,
               private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setForm();
  }

  get editFormData()
  { return this.editForm.controls; }

  private setForm() {
    this.editForm = this.formBuilder.group({
      title: [this.data.job.title],
      company: [this.data.job.company],
      creationDate: [this.data.job.creationDate, ],
      address: [this.data.job.address, ],
      salary: [this.data.job.salary,],
      description: [this.data.job.description, ],
      type: [this.data.job.type]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
