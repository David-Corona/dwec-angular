import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition(':increment', slide(true) ), // if there's an increment (for example: 0 => 1), then slide(true)
      transition(':decrement', slide(false) ),
    ])
  ]
})
export class AppComponent {
  title = 'angularsanvipop';
  constructor(library: FaIconLibrary) {
    library.addIcons(faThumbsUp, faThumbsDown, faUsers, faFacebook, faGoogle);
  }

  getState(outlet: RouterOutlet) {
    // Returns the page animation name (or 'None' of it has no animation)
    return outlet.activatedRouteData['animation'] || 'None';
  }

}

// depending on parameter received (true or false), it will move left or right.
function slide(goRight: boolean) {
  return [
      query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
      query(':enter', style({ transform: (goRight ? "translateX(100%)" : "translateX(-100%)") })),
      group([
        query(':leave', [
          animate('0.2s', style({ transform: (goRight ? "translateX(-100%)" : "translateX(100%)"), opacity: 0 })),
        ]),
        query(':enter', [
          animate('0.2s', style({ transform: 'none' })),
        ]),
      ])
  ];
}
