import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../_services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isSmall:boolean = false

  constructor( private us:UsersService,
               private router: Router) { }

  ngOnInit(): void {
    this.us.isSmall.pipe().subscribe(
      res=>  {this.isSmall = res;
      this.router.navigate([])}

    )

  }

}
