import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-seeker-nav',
  templateUrl: './seeker-nav.component.html',
  styleUrls: ['./seeker-nav.component.css']
})
export class SeekerNavComponent implements OnInit {

  isLoggedIn: boolean = false
  username: string | null = ""
  signinOR : string = "Sign In"
  constructor(private router: Router,
              private authS: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authS.isLoggedIn()

    if(this.isLoggedIn) {
      this.signinOR = "Log Out"
    }
    this.username = localStorage.getItem('username')
  }


  signIn() {
    if(!this.isLoggedIn) {
      this.router.navigate(['/login'],{
        queryParams:{
          role : 'job-seeker'
        }
      })

    }
    else
    {
        this.signinOR="Sign In"
        this.isLoggedIn = false;
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('uid');
        this.router.navigate(['']);
    }

  }

  recruiterPage() {
    this.router.navigate(['/recruiter'])
  }
}
