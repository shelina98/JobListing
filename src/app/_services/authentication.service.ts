import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {

  loggedIn: boolean = false;

  isLoggedIn(): boolean {
    if (localStorage.getItem('email')) {
      return (this.loggedIn = true);
    }
    return false;
  }

  setLoggedIn(toLogInOrNotToLogIn: boolean) {
    this.loggedIn = toLogInOrNotToLogIn;
  }

//login
  getAccountInfo(email: string, password: string): Observable<User[]> {
    return this.fs
      .collection('users', (ref) =>
        ref.where('email',
          '==', email).where('password',
          '==', password)
      )
      .valueChanges() as Observable<User[]>;
  }

//sign up
  getAccountWithGivenEmail(email: string): Observable<User[]> {
    return this.fs
      .collection('users',
        (ref) => ref.
        where('email', '==', email))
      .valueChanges() as Observable<User[]>;
  }

//sign up
  getAccountWithGivenUsername(username: string): Observable<User[]> {
    return this.fs
      .collection('users',
        (ref) =>
          ref.where('username', '==', username))
      .valueChanges() as Observable<User[]>;
  }


  constructor(private fs: AngularFirestore) {}

  setRecruiter(recruiter: boolean) {
    localStorage.setItem('role', 'recruiter');
  }

  isRecruiter(): boolean {

    if (localStorage.getItem('role') === 'recruiter') {
      return true;
    }
    return false;
  }
}
