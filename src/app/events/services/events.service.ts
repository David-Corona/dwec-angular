import { Injectable } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { commentsResponse, EventResponse, EventsResponse, commentResponse } from '../interfaces/responses';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SvComment } from '../interfaces/svcomment';
import { User } from 'src/app/auth/interfaces/user';
import { UsersResponse } from 'src/app/auth/interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventURL = 'events';

  constructor(private readonly http: HttpClient) { }

  getEvents(filter: string): Observable<SVEvent[]> {
    return this.http.get<EventsResponse>(`${this.eventURL}`+filter).pipe(
      map(resp => resp.events),
    );
  }

  getEvent(id: number): Observable<SVEvent> {
    return this.http.get<EventResponse>(`${this.eventURL}/${id}`).pipe(
      map(resp => resp.event),
    );
  }

  addEvent(event: SVEvent): Observable<SVEvent> {
    return this.http.post<EventResponse>(this.eventURL, event).pipe(
      map(resp => resp.event)
    );
  }

  editEvent(id: number, event: SVEvent): Observable<SVEvent> {
    return this.http.put<EventResponse>(`${this.eventURL}/${id}`, event).pipe(
      map(resp => resp.event)
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.eventURL}/${id}`); //doesn’t return any data
  }

  postAttend(id: number): Observable<void> {
    return this.http.post<void>(`${this.eventURL}/${id}`+"/attend", "");
  }

  deleteAttend(id: number): Observable<void> {
    return this.http.delete<void>(`${this.eventURL}/${id}`+"/attend");
  }

  getComments(id: number): Observable<SvComment[]> {
    return this.http.get<commentsResponse>(`${this.eventURL}/${id}`+"/comments").pipe(
      map(resp => resp.comments)
    );
  }

  postComment(id:number, comment:SvComment): Observable<SvComment> {
    return this.http.post<SvComment>(`${this.eventURL}/${id}`+"/comments", comment)
  }

  getAttendees(id:number): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this.eventURL}/${id}`+"/attend").pipe(
      map(resp => resp.users)
    );
  }

}
