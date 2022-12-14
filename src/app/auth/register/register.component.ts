import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'sv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {
    name: "",
    email: "",
    password: "",
    avatar: "",
    lat: 0,
    lng: 0
  }
  emailRep: string = "";
  @ViewChild('lngModel') lngModel!: NgModel;
  @ViewChild('latModel') latModel!: NgModel;
  @ViewChild('imgPreview') imgPreview!: ElementRef;


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SanviPop | Register");
    this.resetForm();
    this.geolocate();
  }

  // show coords if geolocation allowed or show message if not
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.newUser.lat = position.coords.latitude;
        this.newUser.lng = position.coords.longitude;
      }, () => {
        Swal.fire("Geolocation error",
        "Could not obtain coordinates.<br/>" + "Allow geolocation to create account.",
        "error");
        // set inputs as invalid => Form invalid => submit disabled
        this.latModel.control.setErrors({'incorrect': true});
        this.lngModel.control.setErrors({'incorrect': true});
      });
    } else {
      console.error();
    }
  }

  // checks validity of lng and lat without being touched.
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    if (ngModel === this.lngModel || ngModel === this.latModel){
      return {
        [validClass]: ngModel.valid,
        [errorClass]: ngModel.invalid,
      };
    } else { //only validates when it has been touched
      return {
        [validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: ngModel.touched && ngModel.invalid,
      };
    }
  }

  // if the form is valid, the button to create account will activate.
  createAccount() {
    this.authService.register(this.newUser).subscribe({
      next: (e) => {
        console.log(e);
        this.router.navigate(['/login']) //relocate to login
      },
      error: error => {
        console.error(error);
        Swal.fire("Error",
        "There was an error creating the account.<br/>" + "Check that the email isn't already in use.",
        "error");
      }
    });
  }

  loadImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file && file.type.startsWith("image")) { // checks there is a file and that it's an image.
      reader.readAsDataURL(file);
    } else {
      Swal.fire("Error!",
      "You must upload an image.",
      "error");
    }

    reader.addEventListener("load", () => {
      this.newUser.avatar = reader.result as string;

      // remove class d-none to show preview
      this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
    });
  }

  resetForm() {
    this.newUser = {
      name: "",
      email: "",
      password: "",
      avatar: "",
      lat: 0,
      lng: 0
    };
  }
}
