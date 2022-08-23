import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobListingApp';
  users : any[] | undefined;

  constructor(private firestore: AngularFirestore) {
   this.firestore.collection('users').valueChanges().subscribe(

     res => {
       this.users = res
     }
   )
  }

  ngOnInit() {
  }


}

interface OnInit {
  ngOnInit(): void
}
