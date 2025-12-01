// 📁 auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

 canActivate(): boolean {
  const isExpired = this.tokenExpired();

  if (this.auth.isLoggedIn() && !isExpired) {
    return true;
  } else {
    this.router.navigate(['/login']);
    return false;
  }
}


  private tokenExpired(): boolean {
    const token = this.auth.getToken();
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }
}

