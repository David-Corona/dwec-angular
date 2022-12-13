import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LoadFbApiService } from '../services/load-fb-api.service';

@Directive({
  selector: '[svFbLogin]'
})
export class FbLoginDirective {
  @Output() loginOk: EventEmitter<fb.StatusResponse> = new EventEmitter<fb.StatusResponse>();
  @Output() loginError: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadingEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() scopes!: string[];

  constructor(private el: ElementRef, private loadService: LoadFbApiService) {
    loadService.loadApi().subscribe(
      () => this.loadingEnd.emit()
    );
  }

  @HostListener ('click') onClick(): void {
    this.loadService.login(this.scopes.join(',')).subscribe({
      next: resp => this.loginOk.emit(resp),
      error: error => this.loginError.emit('Error with Facebook login!')
    });
  }
}
