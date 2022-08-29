import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Job} from "../_models/job.model";
import {User} from "../_models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase";
import {LovedModel} from "../_models/loved.model";
import {ApplicationModel} from "../_models/application.model";
import App = firebase.app.App;

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

  getCertainJob(uid: string | undefined): Observable<User[]> {
    return this._firestore
      .collection('jobs',
        (ref) =>
          ref.where('uid', '==', uid))
      .valueChanges() as Observable<User[]>;
  }

  getLOVEDInfo(uid: string, jobid: string): Observable<LovedModel[]> {
    return this._firestore.collection('loved', (ref) =>
        ref.where('uidUser',
          '==', uid).where('uidJob',
          '==', jobid)
      )
      .valueChanges() as Observable<LovedModel[]>;
  }
  getApplicationInfo(uid: string, jobid: string): Observable<ApplicationModel[]> {
    return this._firestore.collection('application', (ref) =>
      ref.where('uidUser',
        '==', uid).where('uidJob',
        '==', jobid)
    )
      .valueChanges() as Observable<ApplicationModel[]>;
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
