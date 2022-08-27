import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Job} from "../_models/job.model";
import {User} from "../_models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private _firestore: AngularFirestore) {
  }

  getAllJobs(): Observable<Job[]> {
    return this._firestore
      .collection('jobs')
      .valueChanges() as Observable<Job[]>;
  }

  RecruiterJobs() {
    return this._firestore.collection('jobs',
      (ref) =>
        ref.where('managerID', '==', localStorage.getItem('uid'))
    ).valueChanges() as Observable<Job[]>;
  }

  deleteJob(jobuid: string) {
    this._firestore.collection("jobs").doc(jobuid).delete()
  }
  edit(jobid: string, form: FormGroup) {
    this._firestore.collection('jobs').doc(jobid).update(
      {
        title: form.get('title')?.value,
        company: form.get('company')?.value,
        description: form.get('description')?.value,
        salary: form.get('salary')?.value,
        type: form.get('type')?.value,
        address: form.get('address')?.value,
        creationdate: firebase.firestore.FieldValue.serverTimestamp()

      }
    )
  }

}
