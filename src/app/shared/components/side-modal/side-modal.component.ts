import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-modal',
  imports: [],
  templateUrl: './side-modal.component.html',
})
export class SideModalComponent {

  @Input() show = false; //recibo
  @Input() title = '';
  @Output() closed = new EventEmitter<void>(); //envio
  @Output() saved = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  save() {
    this.saved.emit();
  }


}
