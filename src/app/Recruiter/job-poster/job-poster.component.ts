import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import firebase from "firebase";
import {JobServiceService} from "../../_services/job-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersService} from "../../_services/users.service";



@Component({
  selector: 'app-job-poster',
  templateUrl: './job-poster.component.html',
  styleUrls: ['./job-poster.component.css']
})

export class JobPosterComponent implements OnInit {

  @Input() height : number | undefined

  jobForm = this.fb.group({
    title: ['', [Validators.required],],
    company: ['', [Validators.required]],
    description: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    type: ['', [Validators.required]],
    address: ['', Validators.required]

  },
  );
  isSmall: boolean = false
  private params!: Params;
  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private route:ActivatedRoute,
    private responsive: BreakpointObserver,
    private snackBar: MatSnackBar,
    private us: UsersService
  ) {}

  ngOnInit() {
   this.us.isSmall.subscribe(res => {
     this.isSmall = res
   })
  }

  onClick() {
      this.sendJobInfoTodatabase(this.jobForm);
  }

  sendJobInfoTodatabase(form: FormGroup) {
    this.fs.collection('jobs').add({
      uid: '',
      title: form.get('title')?.value,
      company: form.get('company')?.value,
      description: form.get('description')?.value,
      salary: form.get('salary')?.value,
      type: form.get('type')?.value,
      address: form.get('address')?.value
    })
      .then (
        jobNewRECORD => {
          this.fs.collection('jobs').doc(jobNewRECORD.id)
            .update(
              {
                uid: jobNewRECORD.id,
                managerID: localStorage.getItem('uid'),
                creationdate: firebase.firestore.FieldValue.serverTimestamp()
              }
            );
         if(!this.isSmall) {
           this.rt.navigate([],)
           this.jobForm = this.fb.group({
               title: ['', [Validators.required],],
               company: ['', [Validators.required]],
               description: ['', [Validators.required]],
               salary: ['', [Validators.required]],
               type: ['', [Validators.required]],
               address: ['', Validators.required]
             },
           );

         }else {
           this.rt.navigate(['/recruiter'])
         }

          this.snackBar.open('Job Successfully added.', 'OK', {
            duration: 2000,
            panelClass: ['blue-snackbar', 'login-snackbar'],
          });

        })
  }
}
