import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface UpdatePriceForm {
  id: number;
  newPrice: number;
}

@Component({
  selector: 'app-modal-update-price',
  standalone: false,
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.scss'
})
export class ModalUpdatePriceComponent {
  updatePriceForm: UpdatePriceForm

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.updatePriceForm = {
      id: this.data.id,
      newPrice: 0
    }
  }

  updatePrice() {
    console.log(this.updatePriceForm.id)
    console.log(this.updatePriceForm.newPrice)
  }
}
