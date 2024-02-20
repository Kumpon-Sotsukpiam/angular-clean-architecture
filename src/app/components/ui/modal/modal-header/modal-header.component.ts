import { Component } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent {
  constructor(readonly modal: ModalComponent) { }
}
