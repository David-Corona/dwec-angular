import { Component, ElementRef, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { Title } from '@angular/platform-browser';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'ngx-mapbox-gl-geocoder-control';


@Component({
  selector: 'sv-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  anEvent: SVEvent = {
    title: "",
    description: "",
    price: 0,
    image: "",
    date: "",
    lat: 0,
    lng: 0,
    address: ""
  };

  imageName = "";
  createdOrEdited: boolean = false;
  @ViewChild('eventForm') eventForm!: NgForm;
  @ViewChild('imageModel') imageModel!: NgModel;
  @ViewChild('fileImage') fileImage!: ElementRef;
  isNewEvent: boolean = true;
  zoom = 16;


  constructor(
    private titleService: Title,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
    ) { }


  ngOnInit(): void {
    this.titleService.setTitle("SanviPop | Add Event");
    this.resetForm();

    // if we are editing, get the event to edit. If not, it will be null.
    if (this.route.snapshot.paramMap.get('id')) {
      this.getEventToEdit();
    }
  }

  // in event editing
  getEventToEdit(){
    this.isNewEvent = false; // in edit => image input isn't required
    this.anEvent = this.route.snapshot.data["event"];
    this.anEvent.date = this.anEvent.date.replace(" ", "T");
  }

  // Edit event
  editEvent() {
    this.eventsService.editEvent(this.anEvent.id!, this.anEvent).subscribe({
      next: (e) => {
        console.log(e);
        Swal.fire("Event updated!",
        "The event has been updated successfully.",
        "success");
        this.createdOrEdited = true; // //changes boolean to true, so it doesn't ask for confirmation to leave page.
        this.eventForm.form.markAsUntouched(); // mark all inputs as untouched when edited => cleaner
      },
      error: error => console.error(error)
    });
  }

  // Create event
  setEvent() {
    this.eventsService.addEvent(this.anEvent).subscribe({
      next: () => {
        this.createdOrEdited = true; //changes boolean to true, so it doesn't ask for confirmation to leave page.
        this.router.navigate(['/events']) //relocate to /events
      },
      error: error => console.error(error)
    });
  }

  // when another address is selected => set lat, lng and address.
  changePosition(result: Result) {
    this.anEvent.lat = result.geometry.coordinates[1];
    this.anEvent.lng = result.geometry.coordinates[0];
    this.anEvent.address = result.place_name;
  }

  //only validates when it has been touched
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  //if event is created or form is pristine, returns true and will redirect without asking for confirmation. Else, asks if we want to leave.
  async canDeactivate() {
    if (this.createdOrEdited || this.eventForm.pristine) {
      return true;
    } else {
      return await this.confirm();
    }
  }

  async confirm() {
    return Swal.fire({
      title: 'Do you want to leave?',
      text: 'All changes will be lost!',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: (isConfirm) => {
        return isConfirm; // return true if Yes.
      }
    }).then((result) => {
      Swal.close();
        return result.value;
    });
  }

  //assign new empty event to newEvent to reset form and reset image input
  resetForm() {
    this.anEvent = {
      title: '',
      date: '',
      description: '',
      image: '',
      price: 0,
      lat: 0,
      lng: 0,
      address: ""
    };
    this.imageName = "";
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
    this.anEvent.image = reader.result as string;
    });
  }

}
