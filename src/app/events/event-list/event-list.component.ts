import { Component, OnInit } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users/services/user.service';
import { animate, style, transition, trigger, stagger, query } from '@angular/animations';


@Component({
  selector: 'sv-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [
    // animation when event enters or leaves.
      trigger('animateList', [
      transition(':leave', [
        style({ opacity: 1}),
        animate('1s ease-out', style({ opacity: 0}))
      ]),
      transition(':enter', [
        style({ opacity: 0}),
        animate('1s ease-out', style({ opacity: 1})),
      ]),
    ]),

    // animation when all events are laoded => Stagger makes an element (a card) appear every 250ms.
    trigger('animatedList', [
      transition(':enter', [
        query('sv-event-card', [
          style({ opacity: 0 }),
          stagger('300ms', animate('750ms ease-out', style({ opacity: 1, transform:'none' })))
        ])
      ])
    ])
  ]
})
export class EventListComponent implements OnInit {

  events: SVEvent[] = [];
  search = '';
  userName: string = "";
  action: string = "";

  constructor(
    private eventsService: EventsService,
    private usersService: UserService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router
    ) {
      // To update events when we click on Home when showing events of a user.
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
    }

  ngOnInit() {
    this.titleService.setTitle("SanviPop | Event list");
    this.loadEvents();
  }

  // load events: all events, events user has created or events he is attending => depending on filter/parameter
  loadEvents() {

    const creator = this.route.snapshot.queryParamMap.get('creator'); // user id
    const attending = this.route.snapshot.queryParamMap.get('attending');
    let filter: string = ""; // string will be added to the getUser post method.

    if (creator){
      filter = "?creator=" + creator;
      this.action = "has created:"
      this.getThisUser(+creator); // id as a number.
    } else if (attending){
      filter = "?attending=" + attending;
      this.action = "is attending to:"
      this.getThisUser(+attending);
    } else { // if creator and attending are null, then load all events => no filter
      filter = ""
    }

    this.eventsService.getEvents(filter).subscribe({
      next: events => {
        this.events = events,
        console.log(events);
      },
      error: error => console.error(error),
    });

  }

  getThisUser(id: number){
    this.usersService.getUser(id).subscribe({
      next: (us) => this.userName = us.name,
      error: error => console.error(error)
    });
  }

  // order events by price, from lowest to highest.
  orderPrice() {
    this.search = ""; //deletes any content in search input
    this.events.sort((e1, e2) => e1.price - e2.price);
  }

  // orders events by date.
  orderDate() {
    this.search = "";
    this.events.sort((e1, e2) => new Date(e1.date).getTime() - new Date(e2.date).getTime());
  }

  //delete the event from the array of events.
  delete(event: SVEvent) {
    this.events = this.events.filter((e) => e != event);
  }

}
