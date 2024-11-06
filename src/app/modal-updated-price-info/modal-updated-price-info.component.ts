import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-updated-price-info',
  standalone: false,
  templateUrl: './modal-updated-price-info.component.html',
  styleUrl: './modal-updated-price-info.component.scss'
})
export class ModalUpdatedPriceInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message: string}, 
    private dialogRef: MatDialogRef<ModalUpdatedPriceInfoComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
