import { Component, Input, Output, EventEmitter} from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'sv-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent{

  @Input() event!: SVEvent;
  @Output() deleted = new EventEmitter<void>();
  @Input() isDetails!: boolean;
  @Output() updateAttendees = new EventEmitter<void>();

  constructor(
    private eventsService: EventsService,
  ) {}


  // delete event, emitted and then handled by other components.
  delete() {
    this.eventsService.deleteEvent(this.event.id!).subscribe({
      next: () => {
        this.deleted.emit(); // emit to event-list & event-details.
        console.log("Event deleted successfully.");
      },
      error: error => console.error(error)
    });
  }

  attendance(){
    if (this.event.attend) { // if already attending, then won't attend and deduct one from numAttend.
      this.event.attend = false;
      this.event.numAttend!--;
      this.eventsService.deleteAttend(this.event.id!).subscribe({
        next: () => this.updateAttendees.emit(), // emit to event-details so it can update list of attendees.
        error: error => console.error(error),
      });
    } else {
      this.event.attend = true;
      this.event.numAttend!++;
      this.eventsService.postAttend(this.event.id!).subscribe({
        next: () => this.updateAttendees.emit(),
        error: error => console.error(error)
      });
    }
  }

}
