import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [LogoutActivateGuard],
    component: LoginComponent
  },
  {
    path: 'auth/register',
    canActivate: [LogoutActivateGuard],
    component: RegisterComponent
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
