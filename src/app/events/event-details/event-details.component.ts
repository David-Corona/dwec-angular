import { Component, OnInit } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SvComment } from '../interfaces/svcomment';
import { User } from 'src/app/auth/interfaces/user';


@Component({
  selector: 'sv-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {

  event!: SVEvent;
  isDetails: boolean = true;
  comments: SvComment[] = [];
  newComment: SvComment = {
    comment: ""
  }
  attendees: User[] = [];
  show: boolean = true;
  zoom = 16;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('SanviPop | Event details');
    this.event = this.route.snapshot.data['event']; //get the event from the router's data.
    /*const id = +this.route.snapshot.params['id'];
    this.eventsService.getEvent(id).subscribe({
      next: ev => this.event = ev,
      error: error => console.error(error)
    });*/
    this.showComments();
    this.showAttendees();
  }

  // shows list of attendees to the event.
  showAttendees() {
    this.eventsService.getAttendees(this.event.id!).subscribe({
      next: at => this.attendees = at,
      error: error => console.error(error),
    });
  }

  // shows list of comments.
  showComments() {
    this.eventsService.getComments(this.event.id!).subscribe({
      next: coms => this.comments = coms,
      error: error => console.error(error),
    });
  }

  // show comments or attendees depending on value of variable show.
  showOnlyComments(){
    this.show = true;
  }
  showOnlyAttendees(){
    this.show = false;
  }

  // post comment, push to array of comments and clean new comment textarea.
  postComment(){
    this.eventsService.postComment(this.event.id!, this.newComment).subscribe({
      next: (com) => {
        this.comments.push(com);
        this.newComment.comment = "";
      },
      error: error => console.error(error)
    });
  }

  goBack() {
    this.router.navigate(['/events']);
  }

}
