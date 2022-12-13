import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsRoutingModule } from './events/events-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';


const routes: Routes = [
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' },  // redirect to events if route is empty
  { path: '**', redirectTo: '/events', pathMatch: 'full' }  // redirect to events if route doesn't match any of the above
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), EventsRoutingModule, AuthRoutingModule, UsersRoutingModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }

