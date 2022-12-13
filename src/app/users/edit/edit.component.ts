import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm, NgModel } from '@angular/forms';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'sv-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User = {
    name: "",
    email: "",
    avatar: "",
    lat: 0,
    lng: 0
  }
  passwpordRep: string = "";
  @ViewChild('editPasswordForm') editPasswordForm!: NgForm;
  @ViewChild('editProfileForm') editProfileForm!: NgForm;
  @ViewChild('imgPreview') imgPreview!: ElementRef;
  newAvatar: string = "";


  constructor(
    private titleService: Title,
    private usersService: UserService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SanviPop | Edit Profile");
    this.user = this.route.snapshot.data['user']; //get the user from the router's data.
  }

  // edit email and/or password.
  editProfile() {
    if (this.editProfileForm.form.valid && this.editProfileForm.form.dirty){ // is valid and has been modified
      this.usersService.saveProfile(this.user.name, this.user.email).subscribe({
        next: () => {
          Swal.fire("Profile updated!",
          "Your profile has been updated successfully.",
          "success");
          this.editProfileForm.controls["nameUser"].markAsUntouched();
          this.editProfileForm.controls["email"].markAsUntouched();
        },
        error: error => {
          console.error(error);
          Swal.fire("Error!",
          "Profile could not be edited.",
          "error");
        }
      });
    } else {
      Swal.fire("Error!",
      "The introduced inputs are invalid or have not been modified.",
      "error");
    }
  }

  // edit the password
  editPassword() {
    if (this.editPasswordForm.form.valid){
      this.usersService.savePassword(this.user.password!).subscribe({
        next: () => {
          Swal.fire("Password updated!",
          "Your password has been updated successfully.",
          "success");
          // clean inputs
          this.user.password = "";
          this.passwpordRep = "";
          // mark as untouched => doesn't show errors after clean
          this.editPasswordForm.controls["password"].markAsUntouched();
          this.editPasswordForm.controls["password2"].markAsUntouched();
        },
        error: error => {
          console.error(error);
          Swal.fire("Error!",
          "Password could not be edited.",
          "error");
        }
      });
    } else {
      Swal.fire("Error!",
      "The introduced inputs are invalid.",
      "error");
    }
  }

  //  updates the photo/avatar
  editPhoto() {
    this.usersService.savePhoto(this.newAvatar).subscribe({
      next: () => {
        Swal.fire("Avatar updated!",
        "Your avatar has been updated successfully.",
        "success");
        this.user.avatar = this.newAvatar; // updates user.avatar, so it shows the avatar without refreshing
        this.newAvatar = "";
      },
      error: error => {
        console.error(error);
        Swal.fire("Error!",
        "The introduced input is invalid.",
        "error");
      }
    });
  }

  // loads and shows a preview of the selected image next to current avatar
  loadImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file && file.type.startsWith("image")) { // if there's a file and it's an image
      reader.readAsDataURL(file);
    } else {
      Swal.fire("Error!",
      "You must upload an image.",
      "error");
    }

    reader.addEventListener("load", () => {
      this.newAvatar = reader.result as string;
      // remove class d-none to show preview
      this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
    });
  }

  //only validates when it has been touched
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
