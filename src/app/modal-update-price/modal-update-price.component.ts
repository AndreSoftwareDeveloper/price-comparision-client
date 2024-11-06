import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../api.service';
import { ModalGeneralInfoComponent } from '../modal-general-info/modal-general-info.component';
import { ApiResponse } from '../models/api-response.model';
import { PriceUpdateData } from '../models/price-update-data.model';

@Component({
  selector: 'app-modal-update-price',
  standalone: false,
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.scss'
})
export class ModalUpdatePriceComponent {
  priceUpdateData: PriceUpdateData

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number }, 
    private apiService: ApiService,
    private updatePriceModal: MatDialogRef<ModalUpdatePriceComponent>,
    private generalInfoModal: MatDialogRef<ModalGeneralInfoComponent>,
    private dialog: MatDialog
  ) {
    this.priceUpdateData = {
      id: this.data.id,
      new_price: 0
    }
  }

  updatePrice() {
    this.apiService.updatePrice(this.priceUpdateData).subscribe(
      {
        next: (next: ApiResponse) => {
          this.updatePriceModal.close();
          this.updatePriceModal.afterClosed().subscribe(() => {
              this.generalInfoModal = this.dialog.open(ModalGeneralInfoComponent, { data: next.message });
              this.generalInfoModal.afterClosed().subscribe(() => { 
                  location.reload();
              });
          });
      },
        error: (error: HttpErrorResponse) => {
          this.updatePriceModal.close()
          this.updatePriceModal.afterClosed().subscribe(
            () => {
              this.dialog.open(ModalGeneralInfoComponent, { data: error.message})
            }
          )
        }
      }
    )
  }
}
