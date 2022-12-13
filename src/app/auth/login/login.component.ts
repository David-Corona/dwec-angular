import { Component, OnInit, NgZone  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserLogin } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { LoadFbApiService } from '../facebook-login/services/load-fb-api.service';


@Component({
  selector: 'sv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {
    email: "",
    password: "",
    lat: 0,
    lng: 0
  }
  googleUser!: gapi.auth2.GoogleUser
  fbToken = '';
  coords = {
    lat: 0,
    lng: 0
  };

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private ngZone: NgZone,
    private readonly fbApiService: LoadFbApiService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SanviPop | Login");
    this.resetForm();
    this.geolocate();
  }

  tryLogin() {
    this.user.lat = this.coords.lat;
    this.user.lng = this.coords.lng;
    this.authService.login(this.user);
  }

  loggedGoogle(user: any) {
    this.ngZone.run(() => {  // run() executes function synchronously within the Angular zone => Reenter Angular zone from a task that was executed outside it.
      this.googleUser = user;
      this.authService.loginSocial("google", this.googleUser.getAuthResponse().id_token, this.coords.lat, this.coords.lng);
    });
  }

  loggedFacebook(resp: fb.StatusResponse) {
    // console.log(resp.authResponse.accessToken);
    this.ngZone.run(() => {
      this.authService.loginSocial("facebook", resp.authResponse.accessToken, this.coords.lat, this.coords.lng);
    });
  }

  // fb login error
  showError(error: any) {
    console.error(error);
  }

  // if geolocation on browser is active
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords.lat = position.coords.latitude;
        this.coords.lng = position.coords.longitude;
      });
    }
  }

  resetForm() {
    this.user = {
      email: "",
      password: "",
      lat: 0,
      lng: 0
    };
  }
}
