import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';
import { AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  correctCredentials: boolean = true; //on click checks then if in database these credential exist.

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  role : string = ""
  constructor(
    private fb: FormBuilder,
    private us: UsersService,
    private as: AuthenticationService,
    private fs: AngularFirestore,
    private rt: Router,
    private route: ActivatedRoute
  ) {

   // this.us.getIDs();
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.role = params.role;
        console.log(this.role);
      })

  }

  onClick(email: string, password: string) {

    this.correctCredentials = true;

    this.as.getAccountInfo(email, password).subscribe((el: User[]) => {
      if (el.length == 0) {
        this.correctCredentials = false;
      }
      else
      {
        this.as.setLoggedIn(true);
        localStorage.setItem('email', el[0].email);
        localStorage.setItem('username', el[0].username);
        localStorage.setItem('uid', el[0].uid);

        if (el[0].role === 'recruiter') {
          localStorage.setItem('role', 'recruiter');
          this.as.setRecruiter(true);
          this.rt.navigate(['/recruiter']);

        }

        else {
          localStorage.setItem('role', 'job-seeker');
          this.rt.navigate(['']);
        }
      }
    });

  }
}
