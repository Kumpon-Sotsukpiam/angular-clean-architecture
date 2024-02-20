import { Component } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
  standalone: true,
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss']
})
export class ModalFooterComponent {
  constructor(
    public modal: ModalComponent
  ) { }
}
