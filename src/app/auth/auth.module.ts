import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleLoginModule } from './google-login/google-login.module';
import { FacebookLoginModule } from './facebook-login/facebook-login.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    FontAwesomeModule,
    GoogleLoginModule.forRoot(
      '507320639446-jqftlo9lqpur2kqr7bo5gmcr3l2b12qa.apps.googleusercontent.com'
    ),
    FacebookLoginModule.forRoot({app_id: '340569757711666', version: 'v12.0'})
  ]
})
export class AuthModule { }
