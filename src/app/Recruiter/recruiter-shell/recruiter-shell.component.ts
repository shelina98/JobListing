import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {UsersService} from "../../_services/users.service";


@Component({
  selector: 'app-recruiter-shell',
  templateUrl: './recruiter-shell.component.html',
  styleUrls: ['./recruiter-shell.component.css']
})
export class RecruiterShellComponent implements OnInit {
  whatWillShow: boolean = false;
  height = 100;
  Editmode:boolean = false
  m: boolean = true;
  isSmall:boolean = false
  constructor(private authS: AuthenticationService,
              private route:ActivatedRoute,
              private router: Router,
              private  us: UsersService) {

    localStorage.setItem('role','recruiter')

    route.queryParams.subscribe(p => {
      if (p['modify']) {
        this.Editmode = true
      }
      else {
        this.Editmode = false
      }
    })

    this.us.isSmall.pipe().subscribe(
      res=> {
        this.isSmall = res;
        if(!this.isSmall) {
          this.router.navigate([])
        }
        else {
         this.router.navigate([])
        }
      }
    )
  }

  gotopostjob() {
    this.router.navigate(['recruiter/job-poster'])
  }


  ngOnInit() {
    this.authS.isLoggedInOb().pipe(take(1)).subscribe(
      res => this.m = res
    )
    this.whatWillShow = (this.authS.isLoggedIn() && this.authS.isRecruiter())
    console.log(this.authS.isLoggedIn())
    console.log(this.authS.isRecruiter()
    )

  }


}
