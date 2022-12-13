import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { formatDate } from "@angular/common";

@Directive({
  selector: '[svMinDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true}]
})
export class MinDateDirective implements Validator {

  svMinDate: string = "";

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.svMinDate = formatDate(new Date(), 'yyyy-MM-dd', 'en'); //format the date to compare with control

    console.log(this.svMinDate, control.value);
    if (this.svMinDate && control.value && this.svMinDate > control.value) {
      return { minDate: true };
    }
      return null;
    }

}
