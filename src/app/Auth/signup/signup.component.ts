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
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})


export class SignupComponent implements OnInit {

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
  // private image!: File;
  private image!: File;


  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private responsive: BreakpointObserver,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage
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

  onClick(email: string) {
    this.emailUnique = true;

    let emailSubscription = this.as
      .getAccountWithGivenEmail(email)
      .subscribe((el: User[]) => {
        if (el.length != 0) {
          this.emailUnique = false;
        }
        else
        {
          emailSubscription.unsubscribe();
          this.signUpAccordingToRoles();
            }
          });

  }

  signUpAccordingToRoles() {

    this.sendUserInfoTodatabase(this.signupForm);
    localStorage.setItem('email', this.signupForm.get('email')?.value);
    localStorage.setItem('username', this.signupForm.get('username')?.value);
    this.as.setLoggedIn(true);

    if (this.role === 'recruiter') {
      this.rt.navigate(['/recruiter/job-poster']);
    }
    else
    {
      this.rt.navigate(['']);
    }
  }

  sendUserInfoTodatabase(form: FormGroup) {
        this.fs.collection('users').add( {
          uid: '',
          username: form.get('username')?.value,
          email: form.get('email')?.value,
          password: form.get('password')?.value,
          cpassword: form.get('cpassword')?.value,
          role: this.role,
          imgUrl: ''
        })
            .then (
              UsernewRECORD => {
                this.fs.collection('users').doc(UsernewRECORD.id).update(
                  {
                    uid: UsernewRECORD.id
                  }
                );
                localStorage.setItem('uid',UsernewRECORD.id);
              })
  }
}
