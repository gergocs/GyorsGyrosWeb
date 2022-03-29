import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {CustomErrorStateMatcher} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService){}
  ngOnInit(){}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new CustomErrorStateMatcher();

  getUrl() {
    return "url('../../assets/background.jpg')";
  }
}
