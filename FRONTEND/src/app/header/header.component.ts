import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }

  ngDoCheck(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }

  onAddTodo() {
    this.router.navigate(['/todos', '-1']);
  }

  logout() {
    this.auth.isLogout();
    this.router.navigate(['/']);
  }
}
