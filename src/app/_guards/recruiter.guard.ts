import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";
import {ChangeRootComponent} from "../_shared/change-root/change-root.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class RecruiterGuard implements CanActivate {

  constructor(private authS: AuthenticationService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
              ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authS.isRecruiter()) return true;
    this.openDialog()
    return false;
  }

  openDialog() {
    let message: string;

    if(this.authS.isLoggedIn()) {
      message = 'You will log out to change page!'
    }
    else {
      message = 'You are navigating to Job Poster'
    }

    const dialogRef = this.dialog.open(ChangeRootComponent, {
      data: {
        role: localStorage.getItem('role'),
        message: message,
        buttonText: {
          ok: 'Continue',
          cancel: 'Cancel',
        },
      },
    });

    if(this.authS.isLoggedIn()){
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.snackBar.open('You have been logged out.', 'OK', {
            duration: 2000,
            panelClass: ['blue-snackbar', 'login-snackbar'],
          });
        }
      });
    }
  }

}
