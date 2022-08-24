import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private fs: AngularFirestore) {}

  // getAllUsers(): void {
  //  this.fs.collection('users').valueChanges({ idField: 'uid' }).subscribe(
  //    res => {
  //      return res
  //    }
  //  );
  //
  // }

  // getCertainUser(uid: string | null): Observable<User[]> {
  //   return this.fs
  //     .collection('users',
  //       (ref) =>
  //         ref.where('uid', '==', uid))
  //     .valueChanges() as Observable<User[]>;
  // }



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




  // getIdByEmail(email: string | any): Observable<any> | any {
  //   let documentId: Observable<any>;
  //   return this.fs
  //     .collection('users',
  //       (ref) => ref.
  //     where('email',
  //       '==', email))
  //     .get() as Observable<any>;
  // }

}
