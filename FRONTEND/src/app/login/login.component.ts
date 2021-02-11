import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userEmail: string = 'test4@test.com';
  userPassword: string = 'test@1234';
  isInvalidLogin: boolean = false;
  errorMessage: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.auth.authenticate(this.userEmail, this.userPassword).subscribe(
      (response) => {
        if (response['message'] === 'login successfully') {
          this.isInvalidLogin = false;
          this.router.navigate(['todos']);
        }
      },
      (error) => {
        this.isInvalidLogin = true;
        this.errorMessage = error['error'].message;
      }
    );
  }
}
