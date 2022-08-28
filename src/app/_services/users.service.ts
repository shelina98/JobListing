import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {User} from "../_models/user.model";

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

  // getIdByEmail(email: string | any): Observable<any> | any {
  //   let documentId: Observable<any>;
  //   return this.fs
  //     .collection('users',
  //       (ref) => ref.
  //     where('email',
  //       '==', email))
  //     .get() as Observable<any>;
  // }


  editProduct(user: User,
              image: File | undefined): any {
    if(image) {
      return new Promise((resolve, reject) => {
        let ref = this.fireStorage.ref('jobs' + image.name)
        ref.put(image).then(() => {
          ref.getDownloadURL().subscribe(imgUrl => {
            this.fs.collection('users').doc(user.uid).update(
              {
                username: user.username,
                // skills: user.skills,
                imgUrl: imgUrl
              }
            )
          })
        })
      })

    }
    else {
      this.fs.collection('users').doc(user.uid).update(
        {
          username: user.username,
          // skills: skills,
        }
      )

    }
  }

}
