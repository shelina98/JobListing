import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../_models/user.model";
import {UsersService} from "../../../_services/users.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-prof-edit',
  templateUrl: './prof-edit.component.html',
  styleUrls: ['./prof-edit.component.css']
})
export class ProfEditComponent implements OnInit {
  @ViewChild('image') image!: ElementRef;
  profile!:User
  username!:string
  url!:string
  default:boolean = false

  constructor(private userService: UsersService,
              private fs:AngularFirestore,
              private storage: AngularFireStorage,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.getCertainUser(localStorage.getItem('uid')).subscribe(
      res=> {
        console.log(res)
        this.profile = res[0]
        this.username = this.profile.username
        this.url = this.profile.imgUrl
        if (this.url != "") {
          this.url = this.profile.imgUrl
          this.default = false;
        }
        else {
          this.default = true;
        }
      }
    )
  }

  editUser(): any {
    let img = (<HTMLInputElement>this.image.nativeElement).files?.[0];
    if(img) {
      return new Promise((resolve, reject) => {
        let ref = this.storage.ref('jobs' + img?.name)
        ref.put(img).then(() => {
          ref.getDownloadURL().subscribe(imgUrl => {
            this.fs.collection('users').doc(this.profile.uid).update(
              {
                username: this.username,
                // skills: user.skills,
                imgUrl: imgUrl
              }
            )
          })
        })
      })

    }
    else {
      this.fs.collection('users').doc(this.profile.uid).update(
        {
          username: this.username,
          // imgUrl: 'assets/seekerLogo.PNG'
          // skills: skills,
        }
      ).then(
        ref => {
          this.snackBar.open('Job have updated your profile.', 'OK', {
            duration: 2000,
            panelClass: ['blue-snackbar', 'login-snackbar'],
          })

        }

      )
    }
  }

}


