import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-recruiter-shell',
  templateUrl: './recruiter-shell.component.html',
  styleUrls: ['./recruiter-shell.component.css']
})
export class RecruiterShellComponent implements OnInit {
  whatWillShow!: boolean;
  height = 100;
  Editmode:boolean = false


  constructor(private authS: AuthenticationService,
              private route:ActivatedRoute,
              private router: Router) {

    localStorage.setItem('role','recruiter')

    route.queryParams.subscribe(p => {
      if (p['modify']) {
        this.Editmode = true
      }
      else {
        this.Editmode = false
      }
    })

  }

  gotopostjob() {
    this.router.navigate(['recruiter/job-poster'])
  }

  async ngOnInit() {
    this.whatWillShow = (this.authS.isLoggedIn() && this.authS.isRecruiter())
  }


}
