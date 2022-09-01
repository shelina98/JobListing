import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_models/user.model";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private fs: AngularFirestore,
              private fireStorage: AngularFireStorage) {}

  getCertainUser(uid: string | null): Observable<User[]> {
    return this.fs
      .collection('users',
        (ref) =>
          ref.where('uid', '==', uid))
      .valueChanges() as Observable<User[]>;
  }

  //get rid of this (i merr te gjitha)
  getIDs() {
    this.fs
      .collection('users')
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      });
  }

//po e perdor per responsiveness
  isSmall = new BehaviorSubject<boolean>(this.hasBreakpoint());
  isSmallOb() : Observable<boolean> {
    return this.isSmall.asObservable();
  }
  setSmall() : void {
    localStorage.setItem('breakpoints', 'Small');
    this.isSmall.next(true);
  }
  unsetSmall() : void {
    localStorage.removeItem('breakpoints');
    this.isSmall.next(false);
  }
  private hasBreakpoint() : boolean {
    return !!localStorage.getItem('breakpoints');
  }


}
