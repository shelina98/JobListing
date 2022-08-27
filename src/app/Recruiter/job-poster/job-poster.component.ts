import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import firebase from "firebase";
import {JobServiceService} from "../../_services/job-service.service";



@Component({
  selector: 'app-job-poster',
  templateUrl: './job-poster.component.html',
  styleUrls: ['./job-poster.component.css']
})

export class JobPosterComponent implements OnInit {

  @Input() height : number | undefined
  addOrModify: string = 'ADD'

  jobForm = this.fb.group({
    title: ['', [Validators.required],],
    company: ['', [Validators.required]],
    description: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    type: ['', [Validators.required]],
    address: ['', Validators.required]

  },
  );
  private params!: Params;

  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private route:ActivatedRoute,
    private responsive: BreakpointObserver,
    private js:JobServiceService
  ) {

    route.queryParams.subscribe(p => {
     if(p['modify']) {
       this.params = p
       this.addOrModify = 'Update';
       this.setForm()
     }

     else {

       this.addOrModify = 'ADD';
       this.jobForm = this.fb.group({
           title: ['', [Validators.required],],
           company: ['', [Validators.required]],
           description: ['', [Validators.required]],
           salary: ['', [Validators.required]],
           type: ['', [Validators.required]],
           address: ['', Validators.required]
         },
       );}
    }
    );
  }

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {
      if (result.matches) {
        console.log("screens matches HandsetLandscape") }
    });
  }

  private setForm() {
    this.jobForm = this.fb.group({
      title: [this.route.snapshot.queryParams['title'], Validators.required],
      company: [this.route.snapshot.queryParams['company'], Validators.required],
      creationDate: [this.route.snapshot.queryParams['creationDate'], Validators.required],
      address: [this.route.snapshot.queryParams['address'], Validators.required],
      salary: [this.route.snapshot.queryParams['salary'], Validators.required],
      description: [this.route.snapshot.queryParams['description'], Validators.required],
      type: [this.route.snapshot.queryParams['type'], Validators.required]
    });
  }

  onClick() {
    if(this.addOrModify == 'ADD')
    this.sendJobInfoTodatabase(this.jobForm);
    this.updateJob(this.params['uid'], this.jobForm);
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
        })

  }

  updateJob(uid: string, form: FormGroup) {
  this.js.edit(uid,form)
  }
}
