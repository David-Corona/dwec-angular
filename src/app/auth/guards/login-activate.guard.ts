import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authService.isLogged().subscribe({
        next: resp => {
          if (!resp) {
            this.router.navigate(['/auth/login']);
          }
        },
        error: error => console.error(error)
      });
      return true;
  }
}
