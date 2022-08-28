import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

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
  constructor(
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private rt: Router,
    private as: AuthenticationService,
    private route:ActivatedRoute,
    private responsive: BreakpointObserver,
  ) {

    route.queryParams.subscribe(p => {
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

  async onClick() {
    await this.updateJob(JSON.stringify(localStorage.getItem('idToedit')), this.jobForm);
  }

 async updateJob(uid: string, form: FormGroup) {
    console.log(uid)
    this.fs.collection('jobs',)
      .doc(uid).update(
      {
        title: form.get('title')?.value,
        company: form.get('company')?.value,
        description: form.get('description')?.value,
        salary: form.get('salary')?.value,
        type: form.get('type')?.value,
        address: form.get('address')?.value,
      }
    ).then(function() {
      console.log("Document successfully updated!");
    })
  }
}
