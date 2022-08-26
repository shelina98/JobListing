import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-root',
  templateUrl: './change-root.component.html',
  styleUrls: ['./change-root.component.css']
})

export class ChangeRootComponent implements OnInit {
  title: string = ""
  message: string | undefined ;
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ChangeRootComponent>) {
    if(data){
      if(data.role == 'job-seeker')
      {
        this.title = 'Go to Post Jobs Page'
      }
      else {
        this.title = 'Go to Job Finder'
      }
      this.message = data.message;
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
    if(localStorage.getItem('role')== 'job-seeker')
    {
      this.router.navigate(['/recruiter']);

      localStorage.setItem('role', 'recruiter')
    }
else {
      this.router.navigate(['']);

      localStorage.setItem('role', 'job-seeker')
    }

    this.dialogRef.close(true);
  }
  ngOnInit(): void {
  }

}
