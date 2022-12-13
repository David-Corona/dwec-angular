import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { MenuModule } from './menu/menu.module';
import { EventsModule } from './events/events.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { GoogleLoginModule } from './auth/google-login/google-login.module';
import { FacebookLoginModule } from './auth/facebook-login/facebook-login.module';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    EventsModule,
    FontAwesomeModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiY29yb25hMTIxIiwiYSI6ImNrdnY2aDJpYzE4ZmsycG05Mno5dG91bzkifQ.EEQR8Z-qXQfxkmFRTuKHOQ'
    }),
    NgxMapboxGlGeocoderControlModule,
    GoogleLoginModule.forRoot(
      '507320639446-jqftlo9lqpur2kqr7bo5gmcr3l2b12qa.apps.googleusercontent.com'
    ),
    FacebookLoginModule.forRoot({app_id: '340569757711666', version: 'v12.0'}),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
