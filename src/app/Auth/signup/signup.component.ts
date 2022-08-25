import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user.model';
import { RegexpValidator } from 'src/app/_validators/regexpValidator.validator';
import { AngularFirestore } from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {PasswordValidator} from "src/app/_validators/password.validator";
import {Breakpoints} from '@angular/cdk/layout';
import {BreakpointObserver} from '@angular/cdk/layout'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})


export class SignupComponent implements OnInit {

  usernameUnique: boolean = true;
  emailUnique: boolean = true;
  role: string = ""

  signupForm = this.fb.group({

    username: [
      '',
      [Validators.required, RegexpValidator.usernamePatternValidator],
    ],

    email: ['', [Validators.required, RegexpValidator.emailPatternValidator]],

    password: ['', [Validators.required, Validators.minLength(8)]],

    cpassword: ['', [Validators.required, Validators.minLength(8)]],

  }, {validator: PasswordValidator});


  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private responsive: BreakpointObserver,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {
      if (result.matches) {
        console.log("screens matches HandsetLandscape") }
    });

    this.route.queryParams
      .subscribe(params => {
        this.role = params.role;
      })
  }

  onClick(email: string, username: string) {
    this.usernameUnique = true;
    this.emailUnique = true;

    let emailSubscription = this.as
      .getAccountWithGivenEmail(email)
      .subscribe((el: User[]) => {
        if (el.length != 0) {
          this.emailUnique = false;
        }
        emailSubscription.unsubscribe();

        let usernameSubscription = this.as
          .getAccountWithGivenUsername(username)
          .subscribe((el: User[]) => {
            if (el.length != 0) {
              this.usernameUnique = false;
            }
            else
            {
              if (this.usernameUnique && this.emailUnique) {
                usernameSubscription.unsubscribe();
                this.signUpAccordingToRoles();
              }
            }
          });
      });
  }



  signUpAccordingToRoles() {

    this.sendUserInfoTodatabase(this.signupForm);

    localStorage.setItem('email', this.signupForm.get('email')?.value);
    localStorage.setItem('username', this.signupForm.get('username')?.value);

    this.as.setLoggedIn(true);

    if (this.role === 'recruiter') {
      this.rt.navigate(['/recruiter']);
    }
    else
    {
      this.rt.navigate(['']);
    }
  }

  sendUserInfoTodatabase(form: FormGroup) {

    this.fs.collection('users').add({
      uid: '',
      username: form.get('username')?.value,
      email: form.get('email')?.value,
      password: form.get('password')?.value,
      cpassword: form.get('cpassword')?.value,
      role: this.role,
    })
      .then (
        USERnewRECORD => {
              this.fs.collection('users').doc(USERnewRECORD.id)
                .update(
                {
                  uid: USERnewRECORD.id
                }
              );
              localStorage.setItem('uid',USERnewRECORD.id);
        })


  }

}
