import {Component, Directive, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() height : number | undefined

  userForm!: FormGroup;
  constructor(private fb: FormBuilder,) { }
  ngOnInit(): void {

    this.userForm = this.fb.group({
        username: ['', [Validators.required]],
        // imgUrl: [''],
      },
    );
  }



  onClick() {
  }



}
