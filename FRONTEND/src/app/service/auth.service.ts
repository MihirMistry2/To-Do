import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(email, password) {
    return this.http
      .post('http://localhost:8080/api/user/login', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          sessionStorage.setItem('token', response['token']);
          return response;
        })
      );
  }

  createUser(name, email, password) {
    return this.http.post('http://localhost:8080/api/user/', {
      name,
      email,
      password,
    });
  }

  getAuthToken(): string {
    return sessionStorage.getItem('token');
  }

  isUserLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !(token === null);
  }

  isLogout() {
    sessionStorage.removeItem('token');
  }
}
