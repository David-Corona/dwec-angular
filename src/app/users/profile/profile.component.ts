import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'sv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  zoom = 16;
  user: User = {
    name: "",
    email: "",
    avatar: "",
    lat: 0,
    lng: 0
  }

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SanviPop | User Profile");

    // get the user from the router's data
    this.user = this.route.snapshot.data["user"];

    // lat & lng to load user's location on map.
    this.lat = this.user.lat;
    this.lng = this.user.lng;
  }
}
