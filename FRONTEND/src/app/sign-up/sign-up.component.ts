import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userName: string;
  userEmail: string;
  userPassword: string;
  isSuccess: boolean = false;
  successMessage: string;
  isError: boolean = false;
  errorMessage: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth
      .createUser(this.userName, this.userEmail, this.userPassword)
      .subscribe(
        (response) => {
          if (response['message'] === 'User created successfuly') {
            this.isSuccess = true;
            this.successMessage = response['message'];
          }
        },
        (error) => {
          this.isError = true;
          this.errorMessage = error['error'].message;
        }
      );
  }
}
