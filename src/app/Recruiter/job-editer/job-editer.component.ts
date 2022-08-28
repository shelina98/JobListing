import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-job-editer',
  templateUrl: './job-editer.component.html',
  styleUrls: ['./job-editer.component.css']
})

export class JobEditerComponent implements OnInit {

  @Input() height : number | undefined
  title!:string
  company!:string
  jobForm = this.fb.group({
      title: ['', [Validators.required],],
      company: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      type: ['', [Validators.required]],
      address: ['', Validators.required]
    },
  );
  private address: any;
  private salary: any;
  private description: any;
  private type: any;
  private uid: any;
  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private route:ActivatedRoute,
    private responsive: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {

    route.queryParams.subscribe(p => {
      this.uid = this.route.snapshot.queryParams['uid']
      this.title = this.route.snapshot.queryParams['title']
      this.address = this.route.snapshot.queryParams['address']
      this.salary = this.route.snapshot.queryParams['salary']
      this.company = this.route.snapshot.queryParams['company']
      this.description=  this.route.snapshot.queryParams['description']
      this.type = this.route.snapshot.queryParams['type']
      })
    this.setForm()
  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {
      if (result.matches) {
        console.log("screens matches HandsetLandscape") }
    });
  }

  private setForm() {
    this.jobForm = this.fb.group({
      title: [this.title, [Validators.required]],
      company: [this.company,[Validators.required]],
      address: [this.address,[Validators.required]],
      salary: [this.salary,[Validators.required]],
      description: [this.description,[Validators.required]],
      type: [this.type,[Validators.required]]
    });
  }

   onClick() {
     this.updateJob(this.uid,this.jobForm);
  }

  updateJob(uid: string, form: FormGroup) {
    this.fs.collection('jobs')
      .doc(uid).update(
      {
        title: form.get('title')?.value,
        company: form.get('company')?.value,
        description: form.get('description')?.value,
        salary: form.get('salary')?.value,
        type: form.get('type')?.value,
        address: form.get('address')?.value,
      }
      )

    this.rt.navigate([],{
      queryParams : {
        'modify': null,
        'uid':null,
        'title' : null,
        'company': null,
        'address': null,
        'salary': null,
        'description': null,
        'type':null
      },
      queryParamsHandling: 'merge'
    })

    this.snackBar.open('Job Successfully updated.', 'OK', {
      duration: 2000,
      panelClass: ['blue-snackbar', 'login-snackbar'],
    });

  }

}

