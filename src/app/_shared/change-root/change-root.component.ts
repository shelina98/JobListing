import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-change-root',
  templateUrl: './change-root.component.html',
  styleUrls: ['./change-root.component.css']
})

export class ChangeRootComponent implements OnInit {
  title: string = ""
  message: string = "Are you sure you will leave? You will be logged out!"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ChangeRootComponent>) {
    if(data){
      if(data.role === 'recruiter') {
        this.title = 'Go to Find Jobs Page'
      }
      else
      {
        this.title = 'Go to Post Jobs Page'
      }
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    if(localStorage.getItem('role') === 'recruiter') {
      this.router.navigate(['/recruiter']);

    }
    else {
      this.router.navigate(['']);
    }
    localStorage.removeItem('role')

    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
