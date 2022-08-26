import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobListingApp';

  constructor() {
  }

  ngOnInit() {
  }


}

interface OnInit {
  ngOnInit(): void
}
