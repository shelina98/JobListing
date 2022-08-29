import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import {AuthenticationService} from "../../_services/authentication.service";
import {UsersService} from "../../_services/users.service";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

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
              private authS: AuthenticationService,
              private us:UsersService,) { }

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
        this.authS.logout();
        this.router.navigate(['']);
    }

  }
  goToPRofile() {
    this.router.navigate(['/profile',])
  }

  recruiterPage() {
    this.router.navigate(['/recruiter'])
  }
}
