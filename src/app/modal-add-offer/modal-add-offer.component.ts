import { Component } from '@angular/core';


@Component({
  selector: 'app-modal-add-offer',
  standalone: false,
  templateUrl: './modal-add-offer.component.html',
  styleUrl: './modal-add-offer.component.scss'
})
export class ModalAddOfferComponent {

  constructor() {}

  pickFile() {
    document.getElementById("image")?.click()
  }
}
