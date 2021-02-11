import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
// import { rejects } from 'assert';
// import { resolve } from 'dns';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      if (this.auth.isUserLoggedIn()) {
        return resolve(true);
      }

      this.router.navigate(['/']);
      return reject(false);
    });
  }
}
