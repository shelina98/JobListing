import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {take} from "rxjs/operators";
import {UsersService} from "../../_services/users.service";

@Component({
  selector: 'app-recruiter-nav',
  templateUrl: './recruiter-nav.component.html',
  styleUrls: ['./recruiter-nav.component.css']
})
export class RecruiterNavComponent implements OnInit {
  isSmall:boolean = false
  isLoggedIn: boolean = false
  username: string | null = ""
  signinOR : string = "Sign In"

  constructor(private router: Router,
              private us: UsersService,
              private authS: AuthenticationService) { }

  ngOnInit(): void {

    this.authS.isLoggedInOb().pipe(take(1)).subscribe(
      res => this.isLoggedIn = res
    )

    if(this.isLoggedIn) {
      this.signinOR = "Log Out"
    }
    this.username = localStorage.getItem('username')

    this.us.isSmall.pipe().subscribe(
      res=> this.isSmall = res
    )
  }

  signIn() {
    if(!this.isLoggedIn) {
      this.router.navigate(['/login'],{
        queryParams:{
          role : 'recruiter'
        }
      })
    }
    else {

      this.signinOR="Sign In"
      this.isLoggedIn = false;
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('uid');
      this.authS.setLoggedIn(false)
      this.authS.logout()
      window.location.reload();
    }

  }
  jobPage(){
    this.router.navigate([''])
  }

  goToPRofile() {
    this.router.navigate(['/recruiter/profile-rec'])
  }
  goToHomePage() {
    this.router.navigate(['/recruiter'])
  }
  post() {
    this.router.navigate(['/recruiter/job-poster'])
  }
}
