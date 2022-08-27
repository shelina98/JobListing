import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {JobServiceService} from "../../_services/job-service.service";

@Component({
  selector: 'app-recruiter-shell',
  templateUrl: './recruiter-shell.component.html',
  styleUrls: ['./recruiter-shell.component.css']
})
export class RecruiterShellComponent implements OnInit {
  whatWillShow!: boolean;
  height = 100;

  constructor(private authS: AuthenticationService,) {
    localStorage.setItem('role','recruiter')
  }

  async ngOnInit() {
    this.whatWillShow = (this.authS.isLoggedIn() && this.authS.isRecruiter())
  }


}
