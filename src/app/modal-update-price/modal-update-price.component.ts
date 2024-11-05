import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../api.service';

export interface PriceUpdateData {
  id: number;
  new_price: number;
}

@Component({
  selector: 'app-modal-update-price',
  standalone: false,
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.scss'
})
export class ModalUpdatePriceComponent {
  priceUpdateData: PriceUpdateData

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private apiService: ApiService) {
    this.priceUpdateData = {
      id: this.data.id,
      new_price: 0
    }
  }

  updatePrice() {
    this.apiService.updatePrice(this.priceUpdateData).subscribe(
      {
        next: (next) => {
          console.log(next) //TODO modal
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }
}
