import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import {AuthenticationService} from "../../_services/authentication.service";
import {UsersService} from "../../_services/users.service";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {take} from "rxjs/operators";

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
    this.authS.isLoggedInOb().pipe(take(1)).subscribe(
      res => this.isLoggedIn = res
    )

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
        this.authS.setLoggedIn(false)
        this.authS.logout();
        this.router.navigate(['']);
        window.location.reload();

    }

  }
  goToPRofile() {
    this.router.navigate(['/profile',])
  }
  goToHomePage() {
    this.router.navigate([''])
  }

  recruiterPage() {
    this.router.navigate(['/recruiter'])
  }
}
