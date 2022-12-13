import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';

import { EventListComponent } from './event-list/event-list.component';
import { EventsFilterPipe } from './pipes/events-filter.pipe';
import { EventFormComponent } from './event-form/event-form.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MinDateDirective } from './validators/min-date.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    EventListComponent,
    EventsFilterPipe,
    EventFormComponent,
    EventCardComponent,
    EventDetailsComponent,
    MinDateDirective
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule,
    BrowserAnimationsModule
  ]
})
export class EventsModule { }
