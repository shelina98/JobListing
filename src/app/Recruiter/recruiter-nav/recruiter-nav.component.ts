import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-recruiter-nav',
  templateUrl: './recruiter-nav.component.html',
  styleUrls: ['./recruiter-nav.component.css']
})
export class RecruiterNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  signIn() {
    this.router.navigate(['/login'],{
      queryParams:{
        role : 'recruiter'
      }
    })
  }
  jobPage(){
    this.router.navigate([''])
  }

}
