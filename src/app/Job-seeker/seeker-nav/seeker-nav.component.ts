import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-seeker-nav',
  templateUrl: './seeker-nav.component.html',
  styleUrls: ['./seeker-nav.component.css']
})
export class SeekerNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.router.navigate(['/login'],{
      queryParams:{
        role : 'job-seeker'
      }
    })
  }

  recruiterPage() {
    this.router.navigate(['/recruiter'])
  }
}
