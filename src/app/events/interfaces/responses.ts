import { SvComment } from "./svcomment";
import { SVEvent } from "./svevent";

export interface EventsResponse {
  events: SVEvent[];
}

export interface EventResponse {
  event: SVEvent;
}

export interface commentResponse {
  comment: SvComment;
}

export interface commentsResponse {
  comments: SvComment[];
}
