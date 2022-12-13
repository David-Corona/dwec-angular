import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenResponse, UserResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'auth';
  private logged: boolean = false;
  loginChange$ = new ReplaySubject<boolean>(1)

  constructor(

    private readonly http: HttpClient,
    private router: Router
  ) { }


  login(userLogin: UserLogin): Observable<void> {
    const token = this.http.post<TokenResponse>(`${this.authURL}/login`, userLogin);
    this.saveToken(token);
    return of(undefined);
  }

  // receives observable token => saves in localstorage, logged & loginChange as true and relocate to events. If not, show error.
  saveToken(token: Observable<TokenResponse>): void {
    token.subscribe({
      next: (t) => {
        localStorage.setItem("token", t.accessToken);
        this.logged = true;
        this.loginChange$.next(true);
        this.router.navigate(['/events']) // relocate to /events
      },
      error: (error) => {
        console.error(error);
        Swal.fire("Login error",
        "Login details are incorrect.<br/>" + "Please check credentials and try again.",
        "error");
      }
    });
  }

  register(userInfo: User): Observable<User> {
    return this.http.post<UserResponse>(`${this.authURL}/register`, userInfo).pipe(
      map(resp => resp.user)
    )
  }

  logout(): void {
    localStorage.removeItem("token");
    this.logged = false;
    this.loginChange$.next(false);
    this.router.navigate(['/auth/login']);
  }

  isLogged(): Observable<boolean> {
    if (!this.logged && localStorage.getItem("token")===null) {
      return of(false);
    } else if (this.logged && localStorage.getItem("token")){
      return of(true);
    } else if (!this.logged && localStorage.getItem("token")) {
      if(this.http.get<void>((`${this.authURL}/validate`))) {
        this.logged = true;
        this.loginChange$.next(true);
        return of(true);
      } else {
        localStorage.removeItem("token");
        return of(false);
      }
    } else {
      return of(false);
    }
  }

  loginSocial(socialWeb: string, tokenG: string, lat: number, lng: number): Observable<void> {
    const token = this.http.post<TokenResponse>(`${this.authURL}/${socialWeb}`, {"token": tokenG, "lat": lat,"lng": lng});
    this.saveToken(token);
    return of(undefined);
  }
}
