import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangeRootComponent} from "../_shared/change-root/change-root.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class IsloggedoutGuard implements CanActivate {
  constructor(private authS: AuthenticationService, private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authS.isLoggedIn()) return true;
    this.openDialog()
    return false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeRootComponent, {
      data: {
        role: localStorage.getItem('role'),
        message: 'You will log out to change page!',
        buttonText: {
          ok: 'Continue',
          cancel: 'Cancel',
        },
      },
    });

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


