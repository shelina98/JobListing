import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Job} from "../_models/job.model";
import {User} from "../_models/user.model";

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private _firestore: AngularFirestore) { }

  getAllJobs(): Observable<Job[]> {
    return this._firestore
      .collection('jobs')
      .valueChanges() as Observable<Job[]>;
  }
}
