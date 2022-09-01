import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {UsersService} from "./_services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobListingApp';

  constructor(private responsive: BreakpointObserver,
              private Service: UsersService) {
  }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.Small,
      Breakpoints.XSmall])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall] ) {
          console.log("screens matches Small  or XSmall");
          this.Service.setSmall()
        }
        else {
          console.log("DOESNT MATCH");
          this.Service.unsetSmall()
        }
      });
  }


}

interface OnInit {
  ngOnInit(): void
}
