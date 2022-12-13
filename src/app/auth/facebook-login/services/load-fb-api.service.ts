import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject, Observable, catchError, Observer, tap, of, EMPTY } from 'rxjs';
import { FB_CONFIG, FBConfig } from '../facebook-login.config';

@Injectable({
  providedIn: 'root'
})
export class LoadFbApiService {
  private appId: string;
  private version: string;
  private initialized = false;
  private logged = false;
  private loader$ = new ReplaySubject<void>(1);

  constructor(@Optional() @Inject(FB_CONFIG) fbConfig: FBConfig) {
    if (!fbConfig) {
      throw new Error('FacebookLoginModule: You must call forRoot in your AppModule to pass the APP_ID and Version');
    }

    this.appId = fbConfig.app_id;
    this.version = fbConfig.version;
  }

  loadApi(): Observable<void> {
    if (!this.initialized) {
      this.loadScript();
      this.initialized = true;
    }

    return this.loader$;
  }

  login(scopes: string): Observable<fb.StatusResponse> {
    return this.isLogged().pipe( // First, we'll see if it's already logged
      catchError(response => { // If not logged, we try to log in
        return new Observable((observer: Observer<fb.StatusResponse>) => {
          FB.login((respLogin: fb.StatusResponse) => {
            if (respLogin.status === 'connected') {
              this.logged = true;
              observer.next(respLogin);
            } else {
              this.logged = false;
              observer.error(respLogin);
            }
            observer.complete();
          }, { scope : scopes });
        });
      })
    );
  }

  isLogged(): Observable<fb.StatusResponse> {
    return new Observable((observer: Observer<fb.StatusResponse>) => {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          this.logged = true;
          observer.next(response);
        } else {
          this.logged = false;
          observer.error(response);
        }
        observer.complete();
      });
    });
  }

  logout(): Observable<never> {
    if(this.logged) {
      return new Observable((observer: Observer<never>) => {
        FB.logout(response => {
          observer.complete();
        });
      });
    }
    return EMPTY;
  }

  private loadScript(): void {
    if (this.initialized) { return; }

    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: this.appId,
        xfbml: true,
        version: this.version
      });
      this.loader$.next();
      this.loader$.complete();
    };

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/es_ES/sdk.js';
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);
  }
}
